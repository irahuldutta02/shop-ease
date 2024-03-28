import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/userSlice";
import { BACKEND_URL } from "../constants";

export const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (email === "" || password === "" || name === "") {
      toast.error("Please fill all fields");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await register({ email, password, name }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      toast.success("Registration Successful");
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
            <form className="card-body" onSubmit={handleRegister}>
              <div className="w-full flex justify-center items-center text-3xl text-center">
                <h1>SignUp</h1>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                      navigate("/login");
                    }}
                    className="label-text-alt link link-hover text-sm"
                  >
                    already have an account?
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
                  onClick={handleRegister}
                  className="btn btn-sm btn-primary min-w-[6rem]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "SignUp"
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
