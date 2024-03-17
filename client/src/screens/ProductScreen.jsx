import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { ErrorScreen } from "./ErrorScreen";
import { LoadingScreen } from "./LoadingScreen";
import axios from "axios";

export const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/products/${id}`);
        const { data } = response;
        setProduct(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && !product && <LoadingScreen />}
      {product && !loading && (
        <div className="min-h-screen w-full flex justify-center items-start pt-20 pb-20">
          <div className="flex justify-center items-center w-full max-w-6xl p-4">
            <div className="w-full bg-neutral rounded-lg shadow-xl p-8 flex justify-center items-center gap-4 flex-col md:flex-row">
              <div className="flex-1 h-80 flex justify-center items-center">
                <img
                  src={product?.image}
                  alt="image"
                  className="max-h-80 max-w-80 object-cover rounded-lg shadow-xl"
                />
              </div>
              <div className="flex-1 flex flex-col gap-4 h-80 justify-between">
                <div className="flex flex-col gap-4">
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
                <div className="flex gap-4 items-center justify-end">
                  <div className="badge badge-accent">
                    In Stock: {product?.countInStock}
                  </div>
                  <div className="text-2xl font-bold">${product?.price}</div>
                </div>
                <div className="flex gap-4 items-center justify-end">
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
            <div className=""></div>
          </div>
        </div>
      )}
      {!product && !loading && (
        <ErrorScreen
          error="Product Not Found"
          status={404}
          errorMessage={"The product you are looking for is not exit!"}
        />
      )}
    </>
  );
};
