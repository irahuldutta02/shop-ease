import { Fragment, useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaRegCopy, FaSearch } from "react-icons/fa";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

export const ProductListScreen = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading, refetch } = useGetProductsQuery();
  // const products = data?.data;

  // modified products
  let products = [];
  if (data) {
    // search by product name
    const filteredOrders = data?.data?.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    products = filteredOrders;
  }

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const copyIDToClipboard = (id) => () => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to clipboard");
  };

  const handleDelete = (id) => async () => {
    try {
      await deleteProduct(id).unwrap();
      await refetch();
      toast.success("Product Deleted Successfully");
    } catch (error) {
      toast.error("Error Deleting Product");
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
            <h1 className="text-3xl">All Products</h1>
          </div>
          <div className="w-full flex justify-start items-center text-center flex-col gap-4">
            <div className="w-full flex justify-center items-end flex-col gap-4">
              {/* search */}
              <div className="w-full max-w-60 flex justify-end items-center">
                <label className="input input-bordered w-full max-w-60 input-sm flex items-center gap-2 ">
                  <input
                    type="text"
                    className="grow"
                    placeholder="search by name, id , brand or category"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <FaSearch />
                </label>
              </div>
              <div className="w-full max-w-60 flex justify-end items-center">
                <button
                  onClick={() => {
                    navigate("/admin/create");
                  }}
                  className="btn btn-sm btn-primary"
                >
                  Add New Product
                </button>
              </div>
            </div>
            {isLoading && (
              <div className="w-full flex justify-center items-center">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            )}
            {!isLoading && (
              <div className="overflow-x-auto w-full">
                <table className="table border-2 border-neutral">
                  <thead className="border-2 border-neutral">
                    <tr>
                      <th>ID</th>
                      <th>Details</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Brand</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* products list */}
                    {!isLoading &&
                      !error &&
                      products?.length > 0 &&
                      products.map((product) => (
                        <Fragment key={product._id}>
                          <tr>
                            <td>
                              <div className="flex justify-start items-center gap-2">
                                <button className="btn btn-sm btn-neutral">
                                  {product._id}
                                </button>
                                <button
                                  className="btn btn-sm btn-neutral"
                                  onClick={copyIDToClipboard(product?._id)}
                                >
                                  <FaRegCopy />
                                </button>
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-neutral"
                                onClick={() => {
                                  navigate("/product/" + product?._id);
                                }}
                              >
                                <FaExternalLinkAlt />
                              </button>
                            </td>
                            <td>{product?.name}</td>
                            <td>${product?.price}</td>
                            <td>{product?.countInStock}</td>
                            <td>{product?.brand}</td>
                            <td>
                              <div className="flex justify-center items-center gap-2">
                                <button
                                  disabled={deleteLoading}
                                  className="btn btn-sm btn-primary"
                                  onClick={() => {
                                    navigate(`/admin/edit/${product._id}`);
                                  }}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  disabled={deleteLoading}
                                  className="btn btn-sm btn-danger"
                                  onClick={handleDelete(product?._id)}
                                >
                                  {deleteLoading ? (
                                    <span className="loading loading-dots loading-sm"></span>
                                  ) : (
                                    <MdDeleteOutline />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    {!error && products?.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No Products Found
                        </td>
                      </tr>
                    )}
                    {error && (
                      <tr>
                        <td colSpan="7" className="text-center">
                          Error Fetching Products
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
    </>
  );
};
