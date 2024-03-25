import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import { GoShoppingComponents } from "../components/GoShoppingComponents";

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
    return <GoShoppingComponents />;
  }

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          {/* breadcrumbs */}
          <div className="text-sm breadcrumbs flex justify-start w-full">
            <ul>
              <li>
                <Link
                  to={"/cart"}
                  className=" flex justify-center items-center gap-2"
                >
                  <MdOutlineShoppingCart />
                  Cart
                </Link>
              </li>
              <li>
                <Link to={`/shipping`}>Shipping</Link>
              </li>
              <li>
                <Link to={`/payment`}>Payment Mode</Link>
              </li>
            </ul>
          </div>
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
