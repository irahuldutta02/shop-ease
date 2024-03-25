import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants";
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "../slices/userApiSlice";
import { setCredentials } from "../slices/userSlice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isLoadingPassword }] =
    useForgotPasswordMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please enter your email and password");
      return;
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success("Login Successful");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      toast.error("Please enter your email");
      return;
    }
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred"
      );
    }
  };

  const handleGoogleAuth = async () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google/callback`;
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
                  {isLoadingPassword ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    <a
                      onClick={handleForgotPassword}
                      className="label-text-alt link link-hover"
                    >
                      Forgot Password?
                    </a>
                  )}
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
                    handleGoogleAuth();
                  }}
                  className="btn btn-sm flex-1 btn-accent"
                >
                  <FcGoogle />
                  Google
                </button>
                <button
                  onClick={handleLogin}
                  className="btn btn-sm btn-primary min-w-[6rem]"
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
