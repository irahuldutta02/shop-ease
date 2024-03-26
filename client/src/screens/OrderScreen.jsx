import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";
import { useSelector } from "react-redux";

export const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { userInfo } = useSelector((state) => state.user);

  const { data, isLoading, isError, refetch } =
    useGetOrderDetailsQuery(orderId);

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoading && isError) {
    return (
      <ErrorScreen
        error={"Page not found"}
        errorMessage="Failed to fetch order details"
        status={404}
        onRetry={refetch}
      />
    );
  }

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
                      <span className="text-white">{orderId}</span>
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
                      <span className="text-white">{user?.name}</span>
                    </p>
                    <p>
                      <span className="font-bold">Email : </span>
                      <span className="text-white">{user?.email}</span>
                    </p>
                    <p>
                      <span className="font-bold">Address : </span>
                      <span className="text-white">
                        {shippingAddress?.address}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">City : </span>
                      <span className="text-white">
                        {shippingAddress?.city}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Postal Code : </span>
                      <span className="text-white">
                        {shippingAddress?.postalCode}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Country : </span>
                      <span className="text-white">
                        {shippingAddress?.country}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Payment Method : </span>
                      <span className="text-white">{paymentMethod}</span>
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
                      <span className="text-white">{totalItem}</span>
                    </p>
                    <p>
                      <span className="font-bold">Quantity : </span>
                      <span className="text-white">{totalQuantity}</span>
                    </p>
                    <p>
                      <span className="font-bold">Total : </span>
                      <span className="text-white">${itemsPrice}</span>
                    </p>
                    <p>
                      <span className="font-bold">Shipping : </span>
                      <span className="text-white">
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
                      <span className="text-white">${taxPrice}</span>
                    </p>
                    <p>
                      <span className="font-bold">Subtotal : </span>
                      <span className="text-white">${totalPrice}</span>
                    </p>
                  </div>
                  <div
                    className="flex justify-center items-center gap-4 w-full"
                    // onClick={handlePlaceOrder}
                  >
                    <button
                      disabled={isLoading}
                      className="btn btn-sm btn-primary"
                    >
                      <span>Pay with</span>
                      <span className="capitalize">{paymentMethod}</span>
                    </button>
                    {userInfo?.isAdmin && !order?.isDelivered && (
                      <button
                        disabled={isLoading}
                        className="btn btn-sm btn-accent"
                      >
                        Mark As Delivered
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
