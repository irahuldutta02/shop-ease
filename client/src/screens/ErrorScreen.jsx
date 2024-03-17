import { useEffect } from "react";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const ErrorScreen = ({
  error = "Page Not Found",
  errorMessage = "The page you are looking for does not exist.",
  status = 404,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex h-screen w-full justify-center items-center p-4">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center gap-4">
            <h2 className="card-title text-2xl">
              <FaHeartBroken color="red" /> {error}
            </h2>
            <div className="badge badge-accent">status : {status}</div>
            <p>{errorMessage}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => navigate("/")}
                className="btn btn-sm btn-primary"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
