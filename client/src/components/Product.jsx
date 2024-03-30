import { toast } from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { formateString } from "../utils/formateString";

export const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const findProductInCart = (id) => {
    return cartItems.find((item) => item._id === id);
  };

  const addToCartHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: Number(1) }));
    toast.success(`${product.name} Added to cart`);
  };

  const removeFromCartHandler = (e) => {
    e.stopPropagation();
    dispatch(removeFromCart(product._id));
    toast.success(`${product.name} Removed from cart`, {
      icon: "ℹ️",
    });
  };

  const buyNowHandler = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: Number(1) }));
    navigate("/cart");
  };

  return (
    <>
      <div
        className="card max-w-80 h-[30rem] bg-neutral shadow-xl cursor-pointer
        hover:scale-105 transition-transform duration-300 ease-in-out hover:shadow-primary-content"
        onClick={() => {
          navigate(`/product/${product._id}`);
        }}
      >
        <figure className="w-full h-45 p-4 pb-0">
          <img src={product?.image} alt="image" className="h-full rounded-lg" />
        </figure>

        <div className="card-body gap-3">
          <h2 className="card-title ">{formateString(product?.name, 40)}</h2>
          <div className="card-actions">
            <div className="badge badge-primary">Rating: {product.rating}</div>
            <div className="badge badge-secondary">
              Reviews: {product.numReviews}
            </div>
          </div>
          <p>{formateString(product?.description, 90)}</p>
          <div className="card-actions items-center justify-end">
            <div className="">${product.price}</div>
            {/* buy now or go to cart */}
            {findProductInCart(product._id) ? (
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/cart");
                }}
              >
                Go to Cart
              </button>
            ) : (
              <button className="btn btn-sm btn-accent" onClick={buyNowHandler}>
                Buy Now
              </button>
            )}
            {/* add to cart or remove from cart */}
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
              >
                <button
                  className="btn btn-sm btn-primary"
                  onClick={addToCartHandler}
                >
                  <FaPlus />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
