import { useEffect, useState } from "react";
import { Product } from "../components/Product";
import { LoadingScreen } from "./LoadingScreen";
import axios from "axios";

export const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products`);
        const { data } = response;
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!loading && (
        <div className="min-h-screen flex justify-start items-center flex-col pt-20 pb-10">
          <div className="flex justify-center items-center flex-col w-full max-w-6xl ">
            <div className="flex gap-4 items-center justify-center flex-wrap p-4">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
      {loading && <LoadingScreen />}
    </>
  );
};
