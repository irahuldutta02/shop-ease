import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/userSlice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || error?.message || "An error occurred"
      );
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="card shrink-0 w-full max-w-80 md:max-w-96 shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="w-full flex justify-center items-center text-3xl text-center">
                <h1>LogIn</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                <label className="label">
                  <a
                    onClick={() => {
                      navigate("/forgot-password");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                  <a
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    SignUp
                  </a>
                </label>
              </div>
              <div className="form-control flex-row flex w-full gap-4 mt-6 justify-center items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="btn btn-sm flex-1 btn-accent"
                >
                  <FcGoogle />
                  Signin with Google
                </button>
                <button
                  onClick={handleLogin}
                  className="btn btn-sm btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Login"
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
