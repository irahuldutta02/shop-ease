import { FaSearch } from "react-icons/fa";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // modified products
  let products = [];
  if (data) {
    const filteredProducts = data?.data?.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    products = searchTerm.length > 0 ? filteredProducts : [];
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="">
            <label className="input input-sm input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <FaSearch />
            </label>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            {!isLoading && !error && products.length === 0 && (
              <li>
                <div className="text-center">
                  {searchTerm.length > 0
                    ? "No products found"
                    : "Start searching"}
                </div>
              </li>
            )}
            {!isLoading &&
              !error &&
              products.length > 0 &&
              products.map((product) => (
                <li
                  key={product._id}
                  onClick={() => {
                    navigate(`product/${product?._id}`);
                    setSearchTerm("");
                  }}
                >
                  <div>{product?.name}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
