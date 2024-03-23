import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export const SignupScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col w-full">
          <div className="card shrink-0 w-full max-w-80 md:max-w-96 shadow-2xl bg-base-100">
            <form className="card-body">
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
                  }}
                  className="btn btn-sm flex-1 btn-accent"
                >
                  <FcGoogle />
                  Google
                </button>
                <button className="btn btn-sm btn-primary">SignUp</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
