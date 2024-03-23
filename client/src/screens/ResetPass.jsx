import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useResetPasswordMutation } from "../slices/userApiSlice";

export const ResetPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }
    if (password === "" && confirmPassword === "") {
      toast.error("Please enter password");
      return;
    }

    try {
      const res = await resetPassword({ password, resetToken }).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred"
      );
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="card shrink-0 w-full max-w-80 md:max-w-96 shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleResetPassword}>
              <div className="w-full flex justify-center items-center text-3xl text-center">
                <h1>Reset Password</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6 w-full">
                <button
                  onClick={handleResetPassword}
                  className="btn btn-sm btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
