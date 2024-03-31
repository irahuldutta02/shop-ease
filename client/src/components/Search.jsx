import { FaSearch } from "react-icons/fa";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formateString } from "../utils/formateString";
import { OpenSearchDrawerContext } from "../context";

export const Search = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { setOpenDrawer, openSearchMenu, setOpenSearchMenu } = useContext(
    OpenSearchDrawerContext
  );

  // modified products
  let products = [];
  if (data) {
    const filteredProducts = data?.data?.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    products = searchTerm.length > 0 ? filteredProducts : [];
  }

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
    setSearchTerm("");
    setOpenDrawer(false);
    setOpenSearchMenu(false);
  };

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    setOpenSearchMenu(true);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target.closest(".searchDiv") ||
        e.target.closest(".openDrawerBtn")
      ) {
        return;
      }
      setSearchTerm("");
      setOpenSearchMenu(false);
    });
  }, [setOpenDrawer, setOpenSearchMenu]);

  return (
    <>
      <div className="searchDiv flex justify-center items-center relative">
        <div className="w-60">
          <label className="input input-sm input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow w-full"
              placeholder="Search"
              value={searchTerm}
              onChange={onChange}
            />
            <FaSearch />
          </label>
        </div>
        {openSearchMenu && (
          <ul className="searchMenu w-full bg-base-100 rounded-lg flex flex-col justify-start items-center gap-2 overflow-y-auto max-h-96 absolute top-10">
            {!isLoading &&
              !error &&
              products?.length > 0 &&
              products.map((product) => {
                return (
                  <li
                    key={product?._id}
                    className="rounded-lg w-full cursor-pointer"
                  >
                    <div
                      className="p-2"
                      onClick={() => handleClick(product?._id)}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={product?.image}
                          alt={product?.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="text-sm">
                            {formateString(product?.name, 23)}
                          </p>
                          <p className="text-xs">{product?.brand}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            {!isLoading && !error && products?.length === 0 && (
              <li className="rounded-lg w-full">
                <div className="p-2 text-center">
                  <p className="text-sm">No products found</p>
                </div>
              </li>
            )}
            {isLoading && (
              <li className="rounded-lg w-full">
                <div className="p-2 text-center">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </li>
            )}
            {error && (
              <li className="rounded-lg w-full">
                <div className="p-2 text-center">
                  <p className="text-sm text-red-500">
                    Error fetching products
                  </p>
                </div>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};
