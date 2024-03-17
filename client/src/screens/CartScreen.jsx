import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const CartScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalQuantity = Number(
    cartItems.reduce((acc, item) => acc + item.qty, 0).toFixed(2)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-start items-center flex-col p-4 pt-20 pb-10">
        <div className="flex justify-center items-center flex-col w-full max-w-6xl gap-8">
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-2xl">Shopping Cart</h2>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            {/* cart items  */}

            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <div key={product._id} className="w-full flex flex-col gap-4">
                  <div className="flex w-full justify-center items-start gap-4 bg-neutral rounded-lg p-4 flex-wrap">
                    <div className="flex justify-center items-center w-20 h-20">
                      <img
                        onClick={() => {
                          navigate(`/product/${product._id}`);
                        }}
                        src={product?.image}
                        alt="image"
                        className="w-full h-full rounded-lg cursor-pointer object-cover"
                      />
                    </div>
                    <div className="flex flex-1 justify-start items-start flex-col gap-2 min-w-52">
                      <Link to={`/product/${product._id}`}>
                        <h1>{product?.name}</h1>
                      </Link>
                      <div className="flex justify-start items-center gap-2 flex-wrap">
                        <div className="badge badge-accent">
                          Price: ${product?.price}
                        </div>
                        <div className="badge badge-accent">
                          Quantity: {product?.qty}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <button className="btn btn-sm">Remove</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <div className="rounded-lg w-full bg-neutral text-neutral-content text-center p-4 flex justify-center items-center flex-col gap-4">
                  <h2 className="text-2xl">Your Cart is Empty</h2>
                  <p>
                    Looks like you have not added any items to your cart yet.
                  </p>
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    Home
                  </button>
                </div>
              </div>
            )}

            {/* Proceed to Checkout */}
            {cartItems.length > 0 && (
              <div className="w-full">
                <div className="flex justify-end items-center w-full">
                  <div className="flex justify-end items-center w-full  ">
                    <div className="flex justify-end items-end gap-4 flex-col px-8 p-4 rounded-lg bg-neutral">
                      <div className="flex flex-col justify-center items-end">
                        <h1>Total : ${cart?.itemsPrice}</h1>
                        <h1>
                          Shipping :
                          {cart?.shippingPrice === 0 ? (
                            <>
                              {" "}
                              <s>$10</s> $0
                            </>
                          ) : (
                            " $" + cart?.shippingPrice
                          )}
                        </h1>
                        <h1>Tax : ${cart?.taxPrice}</h1>
                        <h1>Sub Total : ${cart?.totalPrice}</h1>
                        <div className="mt-4 flex gap-2 justify-center items-end">
                          <h1 className="badge">
                            Total Items : {cartItems.length}
                          </h1>
                          <h1 className="badge">
                            Total Quantity : {totalQuantity}
                          </h1>
                        </div>
                      </div>
                      <button className="btn btn-sm btn-primary">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
