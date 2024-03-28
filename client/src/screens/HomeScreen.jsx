import { useEffect } from "react";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import { LoadingScreen } from "./LoadingScreen";
import { ErrorScreen } from "./ErrorScreen";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { setCredentials } from "../slices/userSlice";
import { useDispatch } from "react-redux";

export const HomeScreen = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const products = data?.data;

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
          withCredentials: true,
        });
        if (res?.data?.status !== 202) {
          dispatch(setCredentials({ ...res?.data?.data }));
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getUser();
    refetch();
  }, [dispatch, refetch]);

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
