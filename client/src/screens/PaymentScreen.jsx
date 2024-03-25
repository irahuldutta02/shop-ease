import { useState } from "react";
import { useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { paymentMethod, cartItems } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState(
    paymentMethod?.length > 0 ? paymentMethod : "stripe"
  );

  const handleContinue = () => {
    dispatch(savePaymentMethod(selectedMethod));
    navigate("/place-order");
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
          <div className="flex gap-8 justify-center items-center w-full max-w-80 md:max-w-96 flex-col p-4 bg-neutral shadow-xl rounded-lg ">
            <div className="flex text-3xl w-full justify-center items-center text-center">
              <h1>Payment Method</h1>
            </div>
            <div className="flex flex-col w-full">
              <div className="form-control w-full">
                <label className="label cursor-pointer justify-start gap-4">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-red-500"
                    value={"stripe"}
                    checked={selectedMethod === "stripe"}
                    onChange={() => setSelectedMethod("stripe")}
                  />
                  <span className="label-text">Stripe - Payment Gateway</span>
                </label>
              </div>
              <div className="form-control w-full">
                <label className="label cursor-pointer justify-start gap-4">
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-red-500"
                    disabled
                    value={"razorpay"}
                    checked={selectedMethod === "razorpay"}
                    onChange={() => setSelectedMethod("razorpay")}
                  />
                  <span className="label-text">Razorpay - Payment Gateway</span>
                </label>
              </div>
            </div>
            <div
              className="flex justify-center w-full"
              onClick={handleContinue}
            >
              <button className="btn btn-sm btn-primary">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
