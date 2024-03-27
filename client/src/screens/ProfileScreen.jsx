import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserOrdersQuery } from "../slices/orderApiSlice";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/userSlice";
import { formateDate } from "../utils/formateDate";

export const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: orders, isLoading, error } = useGetUserOrdersQuery();

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const [updatedUser, setUpdatedUser] = useState({
    name: userInfo?.name,
    email: userInfo?.email,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (updatedUser.password !== updatedUser.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (updatedUser.password === "" && updatedUser.confirmPassword === "") {
      toast.error("Please enter password and confirm password");
      return;
    }
    if (updatedUser.email === "") {
      toast.error("Please enter email");
      return;
    }
    if (updatedUser.name === "") {
      toast.error("Please enter name");
      return;
    }

    try {
      const res = await updateUserProfile({
        _id: userInfo._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
      }).unwrap();
      dispatch(setCredentials({ ...res?.data }));
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred"
      );
    } finally {
      setUpdatedUser({
        ...updatedUser,
        password: "",
        confirmPassword: "",
      });
      setIsEditing(false);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          {/* profile */}
          <div className="w-full flex justify-center items-center flex-col gap-8">
            <div className="w-full flex justify-center items-center text-3xl">
              <h1>Profile</h1>
            </div>
            <div className="flex gap-4 justify-center items-center w-full max-w-80 md:max-w-96 flex-col py-4 px-8 bg-neutral shadow-xl rounded-lg ">
              <div className="w-full flex justify-center items-start flex-col gap-2 ">
                {userInfo?.isAdmin && (
                  <div className="w-full flex justify-center items-center">
                    <div className="badge badge-primary">Admin Profile</div>
                  </div>
                )}
                <div className="w-full">
                  {!isEditing && (
                    <>
                      <span className="font-bold">Name : </span>
                      <span className="text-white">{userInfo?.name}</span>
                    </>
                  )}
                  {isEditing && (
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Name</span>
                      </div>
                      <input
                        type="text"
                        value={updatedUser?.name}
                        name="name"
                        placeholder="name"
                        required
                        onChange={handleChange}
                        className="input input-sm input-primary w-full"
                      />
                    </label>
                  )}
                </div>
                <div className="w-full">
                  {!isEditing && (
                    <>
                      <span className="font-bold">Email : </span>
                      <span className="text-white">{userInfo?.email}</span>
                    </>
                  )}
                  {isEditing && (
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Email</span>
                      </div>
                      <input
                        type="email"
                        value={updatedUser?.email}
                        name="email"
                        required
                        placeholder="email"
                        onChange={handleChange}
                        className="input input-sm input-primary w-full"
                      />
                    </label>
                  )}
                </div>

                {isEditing && (
                  <div className="w-full">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Password</span>
                      </div>
                      <input
                        type="password"
                        value={updatedUser?.password}
                        name="password"
                        required
                        placeholder="password"
                        onChange={handleChange}
                        className="input input-sm input-primary w-full"
                      />
                    </label>
                  </div>
                )}

                {isEditing && (
                  <div className="w-full">
                    <label className="form-control w-full">
                      <div className="label">
                        <span className="label-text">Confirm Password</span>
                      </div>
                      <input
                        type="password"
                        value={updatedUser?.confirmPassword}
                        name="confirmPassword"
                        required
                        placeholder="confirm password"
                        onChange={handleChange}
                        className="input input-sm input-primary w-full"
                      />
                    </label>
                  </div>
                )}

                <div className="w-full flex justify-end mt-4 gap-2">
                  {!isEditing && (
                    <button
                      onClick={() => {
                        setIsEditing(true);
                      }}
                      className="btn btn-sm btn-primary"
                    >
                      Edit
                    </button>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => {
                        handleUpdate();
                      }}
                      className="btn btn-sm btn-accent"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : (
                        "Update"
                      )}
                    </button>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => {
                        setUpdatedUser({
                          name: userInfo?.name,
                          email: userInfo?.email,
                          password: "",
                          confirmPassword: "",
                        });
                        setIsEditing(false);
                      }}
                      disabled={isUpdating}
                      className="btn btn-sm btn-secondary"
                    >
                      {isUpdating ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : (
                        "Cancel"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* orders */}

          <div className="w-full flex justify-center items-center flex-col gap-8">
            <div className="w-full flex justify-center items-center text-3xl">
              <h1>Your Orders</h1>
            </div>
            {!error && !isLoading && (
              <div className="w-full flex justify-center items-center">
                <div className="overflow-x-auto w-full flex flex-col gap-4">
                  <table className="table border-2 border-neutral">
                    <thead className="border-b-2 border-neutral">
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <span
                              className="btn btn-sm cursor-pointer"
                              onClick={() => {
                                navigate(`/order/${order._id}`);
                              }}
                            >
                              {order._id}
                            </span>
                          </td>
                          <td>{formateDate(order.createdAt)}</td>

                          <td>${order.totalPrice}</td>
                          <td>
                            <span
                              className={` ${
                                order.isDelivered
                                  ? "text-green-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              {order.isDelivered
                                ? "Delivered"
                                : "Not Delivered Yet"}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {orders?.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Orders Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {isLoading && (
              <div className="w-full flex justify-center items-center">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            )}
            {!isLoading && error && (
              <div className="w-full flex justify-center items-center">
                <p>Error Fetching Orders</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
