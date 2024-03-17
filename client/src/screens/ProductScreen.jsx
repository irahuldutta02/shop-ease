import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import { ErrorScreen } from "./ErrorScreen";
import { LoadingScreen } from "./LoadingScreen";
import { IoHomeOutline } from "react-icons/io5";

export const ProductScreen = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetProductDetailsQuery(id);
  const product = data?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error?.data?.message);
    }
  }, [error]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen
          error="Broken!"
          status={error?.data?.status || 500}
          errorMessage={error?.data?.message || "Something went wrong."}
        />
      ) : (
        <div className="min-h-screen w-full flex justify-center items-start pt-20 pb-20">
          <div className="flex justify-center items-center w-full max-w-4xl p-4">
            <div className="w-full bg-neutral rounded-lg shadow-xl p-8 flex justify-center items-center gap-4 flex-col">
              <div className="text-sm breadcrumbs flex justify-start w-full overflow-hidden">
                <ul>
                  <li>
                    <Link
                      to={"/"}
                      className=" flex justify-center items-center gap-2"
                    >
                      <IoHomeOutline />
                      Home
                    </Link>
                  </li>
                  <li>
                    <a>{product?.name}</a>
                  </li>
                </ul>
              </div>
              <div className="flex-1 h-80 flex justify-center items-center">
                <img
                  src={product?.image}
                  alt="image"
                  className="max-h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
              <div className="flex-1 w-full flex flex-col gap-4 justify-between">
                <div className="flex w-full flex-col gap-4">
                  <h2 className="text-3xl font-bold">{product?.name}</h2>
                  <div className="flex gap-1 items-center">
                    <div className="badge badge-primary">
                      Rating: {product?.rating}
                    </div>
                    <div className="badge badge-secondary">
                      Reviews: {product?.numReviews}
                    </div>
                  </div>
                  <p>{product?.description}</p>
                </div>
                <div className="flex w-full gap-4 items-center justify-end">
                  <div className="badge badge-accent">
                    In Stock: {product?.countInStock}
                  </div>
                  <div className="text-2xl font-bold">${product?.price}</div>
                </div>
                <div className="flex w-full gap-4 items-center justify-end">
                  <select className="select select-bordered select-sm w-20">
                    <option disabled>Quantity</option>
                    {[
                      ...Array(
                        product?.countInStock > 5 ? 5 : product?.countInStock
                      ).keys(),
                    ].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-sm btn-accent">Buy Now</button>
                  <button className="btn btn-sm btn-primary">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
