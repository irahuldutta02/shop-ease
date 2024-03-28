import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaMinus, FaShareAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { useGetProductDetailsQuery } from "../slices/productApiSlice";
import { ErrorScreen } from "./ErrorScreen";
import { LoadingScreen } from "./LoadingScreen";

export const ProductScreen = () => {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetProductDetailsQuery(id);
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

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const findProductInCart = (id) => {
    return cartItems.find((item) => item._id === id);
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(quantity) }));
    toast.success(`${product.name} Added to cart`);
  };
  const removeFromCartHandler = () => {
    dispatch(removeFromCart(product._id));
    toast.success(`${product.name} Removed from cart`, {
      icon: "ℹ️",
    });
  };

  const buyNowHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: Number(quantity) }));
    navigate("/cart");
  };

  const handleQuantityChange = (value, countInStock) => {
    if (value > countInStock) {
      toast.dismiss();
      toast.success(`Max stock reached.`, {
        icon: "ℹ️",
      });
      setQuantity(countInStock);
    } else if (value < 1) {
      toast.dismiss();
      toast.success(`Minimum 1 item have to be added.`, {
        icon: "ℹ️",
      });
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

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
              {/* breadcrumbs */}
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
                    <Link to={`/product/${product?._id}`}>{product?.name}</Link>
                  </li>
                </ul>
              </div>
              {/* image and share btn */}
              <div className="flex-1 relative w-full h-80 flex justify-center items-center">
                <img
                  src={product?.image}
                  alt="image"
                  className="max-h-96 object-cover rounded-lg shadow-xl"
                />
                <button
                  className="btn btn-sm btn-outline absolute top-4 right-4"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied to clipboard");
                  }}
                >
                  <FaShareAlt />
                </button>
              </div>
              {/* Description and actions */}
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
                  {/* quantity */}
                  <input
                    value={quantity}
                    onChange={(e) => {
                      handleQuantityChange(
                        e.target.value,
                        product?.countInStock
                      );
                    }}
                    type="number"
                    placeholder="Quantity"
                    className="grow input input-sm input-bordered max-w-20"
                    min={1}
                    max={product?.countInStock}
                  />
                  {/* buy now or go to cart */}
                  {findProductInCart(product._id) ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      Go to Cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={buyNowHandler}
                    >
                      Buy Now
                    </button>
                  )}
                  {/* Add to cart or remove from cart */}
                  {findProductInCart(product._id) ? (
                    <div
                      className="tooltip tooltip-bottom tooltip-info"
                      data-tip="Remove from cart"
                    >
                      <button
                        className="btn btn-sm btn-accent"
                        onClick={removeFromCartHandler}
                      >
                        <FaMinus />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="tooltip tooltip-bottom tooltip-info"
                      data-tip="Add to cart"
                      onClick={addToCartHandler}
                    >
                      <button className="btn btn-sm btn-primary">
                        <FaPlus />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
