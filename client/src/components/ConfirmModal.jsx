import { useContext, useState } from "react";
import { CartConfirmModalContext, ThemeContext } from "../context";

export const ConfirmModal = ({
  message = "Are you sure about it?",
  title = "Confirmation",
  option = {
    true: "Accept",
    false: "Deny",
  },
  handleConfirmation,
}) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { setShowCartConfirmModal, setDoNotShowAgainCartModal } = useContext(
    CartConfirmModalContext
  );

  const SubmitHandler = (answer) => {
    if (doNotShowAgain) {
      setDoNotShowAgainCartModal(true);
    }
    handleConfirmation(answer);
    setShowCartConfirmModal(false);
  };

  return (
    <>
      <div
        className={`fixed w-full overflow-hidden h-screen z-50 flex justify-center items-center p-4 top-0 left-0 ${
          theme === "dark" ? "bg-white bg-opacity-10" : "bg-black bg-opacity-50"
        } `}
      >
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center gap-4">
            <h2 className="card-title">{title}</h2>
            <p>{message}</p>
            <div className="card-actions justify-end">
              <div className="flex justify-center items-center flex-wrap gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={doNotShowAgain}
                  onChange={() => setDoNotShowAgain(!doNotShowAgain)}
                />
                <label htmlFor="">Do not show again</label>
              </div>
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  SubmitHandler(true);
                }}
              >
                {option.true}
              </button>
              <button
                className="btn btn-sm "
                onClick={() => {
                  SubmitHandler(false);
                }}
              >
                {option.false}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
