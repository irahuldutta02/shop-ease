import { useEffect, useState } from "react";
import { Product } from "../components/Product";
import { getProducts } from "../data/products";

export const HomeScreen = () => {
  const [products] = useState(getProducts());

  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-start items-center flex-col pt-20 pb-10">
        <div className="flex justify-center items-center flex-col w-full max-w-6xl ">
          <div className="flex gap-4 items-center justify-center flex-wrap p-4">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
