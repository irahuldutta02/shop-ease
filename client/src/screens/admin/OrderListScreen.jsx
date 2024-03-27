import { toast } from "react-hot-toast";
import {
  FaCheck,
  FaExternalLinkAlt,
  FaRegCopy,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrdersQuery,
} from "../../slices/orderApiSlice";
import { formateDate } from "../../utils/formateDate";
import { useEffect, useState } from "react";

export const OrderListScreen = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const { data, isLoading, error, refetch } = useGetOrdersQuery();

  // modify orders
  let orders = [];
  if (data) {
    // search by order id
    const filteredOrders = data?.filter((order) => {
      return order._id.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // search by date
    const filteredOrdersByDate =
      searchDate === ""
        ? filteredOrders
        : filteredOrders?.filter((order) => {
            return formateDate(order.createdAt) === formateDate(searchDate);
          });

    // sort by date
    const sortedOrder = filteredOrdersByDate.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    orders = sortedOrder;
  }

  const [deliverOrder, { isLoading: updateOrderLoading }] =
    useDeliverOrderMutation();

  const copyIDToClipboard = (id) => () => {
    navigator.clipboard.writeText(id);
    toast.success("Order ID copied to clipboard");
  };

  const handleMarkAsDelivered = (orderId) => async () => {
    try {
      await deliverOrder(orderId).unwrap();
      await refetch();
      toast.success("Order Marked as Delivered Successfully");
    } catch (error) {
      toast.error("Error Marking order as delivered");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-8 w-full max-w-6xl p-4">
          <div className="w-full flex justify-center items-center text-center flex-col">
            <h1 className="text-3xl">Orders</h1>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            {isLoading && (
              <span className="loading loading-dots loading-sm"></span>
            )}
            {!isLoading && error && (
              <div className="text-red-500 text-lg">Error Fetching Orders</div>
            )}
            {!isLoading && !error && (
              <div className="w-full flex justify-center items-center flex-col gap-4">
                {/* filters */}
                {/* search */}
                <div className="w-full flex justify-end items-center">
                  <label className="input input-bordered w-full max-w-60 input-sm flex items-center gap-2 ">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Search by ID"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />

                    <FaSearch />
                  </label>
                </div>
                {/* date */}
                <div className="w-full flex justify-end items-center ">
                  <div className="w-full max-w-60 flex justify-center items-end gap-4">
                    <input
                      type="date"
                      name=""
                      id=""
                      className="input input-bordered input-sm flex-1"
                      value={searchDate}
                      onChange={(e) => {
                        setSearchDate(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setSearchDate("");
                        setSearchTerm("");
                        refetch();
                      }}
                      className="btn btn-sm btn-accent"
                    >
                      Reset
                    </button>
                  </div>
                </div>
                {/* orders list */}
                <div className="w-full overflow-x-auto">
                  <table className="table border-2 border-neutral">
                    <thead className="border-2 border-neutral">
                      <tr>
                        <th>ID</th>
                        <th>Details</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Delivered</th>
                        <th>Mark As Delivered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No Orders Found
                          </td>
                        </tr>
                      )}
                      {orders.map((order) => (
                        <tr key={order?._id}>
                          <td className="flex justify-start items-center gap-2">
                            <button className="btn btn-sm btn-neutral">
                              {order._id}
                            </button>
                            <button
                              className="btn btn-sm btn-neutral"
                              onClick={copyIDToClipboard(order?._id)}
                            >
                              <FaRegCopy />
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-neutral"
                              onClick={() => {
                                navigate("/order/" + order?._id);
                              }}
                            >
                              <FaExternalLinkAlt />
                            </button>
                          </td>
                          <td>
                            <div>{order?.user && order?.user?.name}</div>
                            <div>({order?.user && order?.user?.email})</div>
                          </td>
                          <td>{formateDate(order?.createdAt)}</td>
                          <td>${order?.totalPrice}</td>
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
                          <td className="flex justify-center items-center gap-2">
                            <button
                              onClick={handleMarkAsDelivered(order._id)}
                              className="btn btn-sm btn-accent"
                              disabled={order.isDelivered || updateOrderLoading}
                            >
                              {updateOrderLoading ? (
                                <span className="loading loading-dots loading-sm"></span>
                              ) : (
                                <FaCheck />
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
