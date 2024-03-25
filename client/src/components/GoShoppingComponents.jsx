import { useNavigate } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";

export const GoShoppingComponents = () => {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
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
    </>
  );
};
