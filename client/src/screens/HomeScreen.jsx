import { useEffect } from "react";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";

export const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const products = data?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <>
          <div className="min-h-screen flex justify-start items-center flex-col pt-20 pb-10">
            <div className="flex justify-center items-center flex-col w-full max-w-6xl ">
              <div className="flex gap-6 items-center justify-center flex-wrap p-4">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
