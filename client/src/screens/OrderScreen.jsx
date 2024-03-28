import { useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayWithStripeMutation,
} from "../slices/orderApiSlice";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";
import { useSelector } from "react-redux";
import { formateDateTime } from "../utils/formateDate";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { userInfo } = useSelector((state) => state.user);

  const { data, isLoading, isError, refetch } =
    useGetOrderDetailsQuery(orderId);

  const [payWithStripe, { isLoading: loadingStripe }] =
    usePayWithStripeMutation();

  const [deliverOrder, { isLoading: updateOrderLoading }] =
    useDeliverOrderMutation();

  const order = data?.data;

  const shippingAddress = order?.shippingAddress;
  const user = order?.user;
  const isDelivered = order?.isDelivered;
  const orderItems = order?.orderItems;
  const paymentMethod = order?.paymentMethod;
  const itemsPrice = order?.itemsPrice;
  const taxPrice = order?.taxPrice;
  const shippingPrice = order?.shippingPrice;
  const totalPrice = order?.totalPrice;

  const totalItem = orderItems?.length;
  const totalQuantity = orderItems?.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoading && isError) {
    return (
      <ErrorScreen
        error={"Page not found"}
        errorMessage="Failed to fetch order details"
        status={404}
      />
    );
  }

  const handleStripePayment = async (orderItems) => {
    try {
      const res = await payWithStripe({
        orderId,
        orderItems,
      }).unwrap();
      window.location.href = res.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsDelivered = (orderId) => async () => {
    try {
      await deliverOrder(orderId).unwrap();
      await refetch();
      toast.success("Order Marked as Delivered Successfully");
    } catch (error) {
      toast.error("Error Marking order as delivered");
    }
  };

  if (!isLoading && !isError) {
    return (
      <>
        <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
          <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
            <div className="flex flex-col justify-center items-center w-full gap-8">
              <div className="w-full flex justify-center items-center text-center">
                <h1 className="text-3xl font-bold">Order Details</h1>
              </div>

              <div className="flex justify-center items-center flex-col w-full gap-4">
                {/* order details */}
                <div className="flex gap-4 justify-center items-center w-full max-w-80 md:max-w-96 flex-col py-4 px-8 bg-neutral shadow-xl rounded-lg ">
                  <div className="w-full flex justify-center items-start flex-col gap-1 ">
                    <p>
                      <span className="font-bold">Number : </span>
                      <span className="text-secondary-content">{orderId}</span>
                    </p>
                    <p>
                      <span className="font-bold">Status : </span>
                      <span
                        className={`
                      ${isDelivered ? "text-green-500" : "text-yellow-500"}
                      `}
                      >
                        {isDelivered ? "Delivered" : "Not Delivered Yet"}
                      </span>
                    </p>
                    {isDelivered && (
                      <p>
                        <span className="font-bold">Delivered At : </span>
                        <span className="text-green-500">
                          {formateDateTime(order?.deliveredAt)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                {/* Shipping Details */}
                <div className="flex gap-4 justify-center items-center w-full max-w-80 md:max-w-96 flex-col py-4 px-8 bg-neutral shadow-xl rounded-lg ">
                  <div className="w-full text-xl flex justify-center items-center flex-col gap-2">
                    Shipping Details
                  </div>
                  <div className="w-full flex justify-center items-start flex-col gap-1 ">
                    <p>
                      <span className="font-bold">Name : </span>
                      <span className="text-secondary-content">
                        {user?.name}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Email : </span>
                      <span className="text-secondary-content">
                        {user?.email}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Address : </span>
                      <span className="text-secondary-content">
                        {shippingAddress?.address}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">City : </span>
                      <span className="text-secondary-content">
                        {shippingAddress?.city}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Postal Code : </span>
                      <span className="text-secondary-content">
                        {shippingAddress?.postalCode}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Country : </span>
                      <span className="text-secondary-content">
                        {shippingAddress?.country}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Payment Method : </span>
                      <span className="text-secondary-content">
                        {paymentMethod}
                      </span>
                    </p>
                  </div>
                </div>
                {/* products */}
                <div className="w-full flex justify-center items-center">
                  <div className="overflow-x-auto w-full max-w-80 md:max-w-96 flex flex-col gap-4">
                    <table className="table border-2 border-neutral">
                      <thead className="border-b-2 border-neutral">
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderItems.map((product) => (
                          <tr key={product._id}>
                            <td>
                              <div className="flex gap-4 justify-start items-center">
                                <div>
                                  <h1>{product.name}</h1>
                                </div>
                              </div>
                            </td>
                            <td>{product.qty}</td>
                            <td>${product.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Order Summary */}
                <div className="flex gap-4 justify-center items-center w-full max-w-80 md:max-w-96 flex-col py-4 px-8 bg-neutral shadow-xl rounded-lg ">
                  <div className="flex text-xl justify-center items-center flex-col gap-4 w-full">
                    Order Summary
                  </div>
                  <div className="flex justify-center items-start flex-col w-full gap-1">
                    <p>
                      <span className="font-bold">Product : </span>
                      <span className="text-secondary-content">
                        {totalItem}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Quantity : </span>
                      <span className="text-secondary-content">
                        {totalQuantity}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Total : </span>
                      <span className="text-secondary-content">
                        ${itemsPrice}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Shipping : </span>
                      <span className="text-secondary-content">
                        {shippingPrice === 0 ? (
                          <>
                            <s>$10</s> $0
                          </>
                        ) : (
                          "$" + shippingPrice
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Tax : </span>
                      <span className="text-secondary-content">
                        ${taxPrice}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Subtotal : </span>
                      <span className="text-secondary-content">
                        ${totalPrice}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-4 w-full">
                    {userInfo?._id === user._id && (
                      <button
                        disabled={loadingStripe}
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          handleStripePayment(orderItems);
                        }}
                      >
                        {loadingStripe ? (
                          <>
                            <span className="loading loading-dots loading-sm"></span>
                          </>
                        ) : (
                          <>
                            <span>Pay with</span>
                            <span className="capitalize">{paymentMethod}</span>
                          </>
                        )}
                      </button>
                    )}
                    {userInfo?.isAdmin && !order?.isDelivered && (
                      <button
                        className="btn btn-sm btn-accent"
                        disabled={order?.isDelivered || updateOrderLoading}
                        onClick={handleMarkAsDelivered(orderId)}
                      >
                        {updateOrderLoading ? (
                          <span className="loading loading-dots loading-sm"></span>
                        ) : (
                          "Mark As Delivered"
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
