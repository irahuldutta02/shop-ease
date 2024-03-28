import { useEffect, useState } from "react";
import {
  useGetAllUserQuery,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} from "../../slices/userApiSlice";
import { FaRegCopy, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

export const UserEditScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading, refetch } = useGetAllUserQuery();

  const [makeAdmin, { isLoading: makeAdminLoading }] = useMakeAdminMutation();
  const [removeAdmin, { isLoading: removeAdminLoading }] =
    useRemoveAdminMutation();

  // modified users
  let users = [];
  if (data) {
    // search by product name
    const filteredOrders = data?.data?.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    users = filteredOrders;
  }

  const copyIDToClipboard = (id) => () => {
    navigator.clipboard.writeText(id);
    toast.success("User ID copied to clipboard");
  };

  const handleMakeAdmin = (id) => async () => {
    try {
      await makeAdmin(id).unwrap();
      refetch();
      toast.success("User is now an Admin");
    } catch (error) {
      toast.error(
        error?.message || error?.data?.message || "Error making user an Admin"
      );
    }
  };

  const handleRemoveAdmin = (id) => async () => {
    try {
      await removeAdmin(id).unwrap();
      refetch();
      toast.success("User is now a User");
    } catch (error) {
      toast.error(
        error?.message || error?.data?.message || "Error removing user as Admin"
      );
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          <div className="w-full flex justify-start items-center text-center flex-col">
            <h1 className="text-3xl">All Users</h1>
          </div>
          <div className="w-full flex justify-start items-center text-center flex-col gap-4">
            {/* search */}
            <div className="w-full flex justify-center items-end flex-col gap-4">
              <div className="w-full max-w-60 flex justify-end items-center">
                <label className="input input-bordered w-full max-w-60 input-sm flex items-center gap-2 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="search by name, email or id"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <FaSearch />
                </label>
              </div>
            </div>
            <div className="w-full flex justify-center items-center flex-col gap-4">
              {isLoading && (
                <div className="w-full flex justify-center items-center">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              )}
              {!isLoading && (
                <div className="w-full overflow-x-auto">
                  <table className="table border-2 border-neutral">
                    <thead className="border-2 border-neutral">
                      <tr>
                        <th className=" text-center">USER ID</th>
                        <th className=" text-center">NAME</th>
                        <th className=" text-center">EMAIL</th>
                        <th className=" text-center">ROLE</th>
                        <th className=" text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!error && users.length === 0 && (
                        <tr>
                          <td colSpan="5">
                            <div className="flex justify-center items-center gap-2">
                              <span>No users found</span>
                            </div>
                          </td>
                        </tr>
                      )}
                      {!error &&
                        users.length > 0 &&
                        users.map((user) => (
                          <tr key={user._id}>
                            <td>
                              <div className="flex justify-center items-center gap-2">
                                <button className="btn btn-sm btn-neutral">
                                  {user._id}
                                </button>
                                <button
                                  className="btn btn-sm btn-neutral"
                                  onClick={copyIDToClipboard(user?._id)}
                                >
                                  <FaRegCopy />
                                </button>
                              </div>
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <div className="text-center">
                                {user.isAdmin ? (
                                  <span className="text-red-500">Admin</span>
                                ) : (
                                  <span className="text-green-500">User</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="flex justify-center items-center gap-2">
                                {!user.isAdmin && (
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={handleMakeAdmin(user._id)}
                                    disabled={
                                      makeAdminLoading || removeAdminLoading
                                    }
                                  >
                                    {removeAdminLoading ? (
                                      <span className="loading loading-dots loading-sm"></span>
                                    ) : (
                                      "Make Admin"
                                    )}
                                  </button>
                                )}
                                {user.isAdmin && (
                                  <button
                                    onClick={handleRemoveAdmin(user._id)}
                                    disabled={
                                      makeAdminLoading || removeAdminLoading
                                    }
                                    className="btn btn-sm btn-accent"
                                  >
                                    {removeAdminLoading ? (
                                      <span className="loading loading-dots loading-sm"></span>
                                    ) : (
                                      "Remove Admin"
                                    )}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      {error && (
                        <tr>
                          <td colSpan="5">
                            <div className="flex justify-center items-center gap-2">
                              <span className="text-red-500">
                                Error fetching data
                              </span>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
