import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";

export const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const {
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const totalItem = cartItems.length;
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handlePlaceOrder = async () => {
    try {
      const response = await createOrder({
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      if (response.status === 201) {
        toast.success("Order saved successfully");
        dispatch(clearCart());
        // navigate(`/order/${response.data._id}`);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          <div className="flex justify-center items-center flex-col gap-4 w-full">
            <div className="flex justify-center items-center flex-col gap-4 w-full">
              <h1 className="text-xl font-bold">Your Cart is Empty</h1>
              <div className="flex justify-center items-center flex-col gap-4 w-full">
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-sm btn-primary"
                >
                  Go Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          <div className="flex flex-col justify-center items-center w-full gap-8">
            <div className="w-full flex justify-center items-center text-center">
              <h1 className="text-3xl font-bold">Place Order</h1>
            </div>
            <div className="flex justify-center items-center flex-col w-full gap-4">
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
                      {cartItems.map((product) => (
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
              <div className="flex gap-4 justify-center items-center w-full max-w-80 md:max-w-96 flex-col py-4 px-8 bg-neutral shadow-xl rounded-lg ">
                <div className="w-full text-xl flex justify-center items-center flex-col gap-2">
                  Order Details
                </div>
                <div className="w-full flex justify-center items-start flex-col gap-1 ">
                  <p>
                    <span className="font-bold">Address : </span>
                    <span className="text-white">{address}</span>
                  </p>
                  <p>
                    <span className="font-bold">City : </span>
                    <span className="text-white">{city}</span>
                  </p>
                  <p>
                    <span className="font-bold">Postal Code : </span>
                    <span className="text-white">{postalCode}</span>
                  </p>
                  <p>
                    <span className="font-bold">Country : </span>
                    <span className="text-white">{country}</span>
                  </p>
                  <p>
                    <span className="font-bold">Payment Method : </span>
                    <span className="text-white">{paymentMethod}</span>
                  </p>
                </div>
              </div>
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
                        shippingPrice
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
                  className="flex justify-center items-center flex-col gap-4 w-full"
                  onClick={handlePlaceOrder}
                >
                  <button
                    disabled={isLoading}
                    className="btn btn-sm btn-primary"
                  >
                    {isLoading ? (
                      <span className="loading loading-dots loading-sm"></span>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
