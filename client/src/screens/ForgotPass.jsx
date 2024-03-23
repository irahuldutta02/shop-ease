import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPass = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="card shrink-0 w-full max-w-80 md:max-w-96 shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="w-full flex justify-center items-center text-3xl text-center">
                <h1>Forgot Password</h1>
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
                <label className="label">
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    Login
                  </a>
                  <a
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="label-text-alt link link-hover"
                  >
                    Signup
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-sm btn-primary">Send Email</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
