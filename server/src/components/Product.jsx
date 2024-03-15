import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="card max-w-80 h-[30rem] bg-neutral shadow-xl">
        <figure className="w-full h-45">
          <img
            src="https://source.unsplash.com/random/?products"
            alt="Shoes"
          />
        </figure>

        <div className="card-body gap-3">
          <h2
            onClick={() => {
              navigate(`/product/${product.id}`);
            }}
            className="card-title cursor-pointer"
          >
            {product.name}
          </h2>
          <div className="card-actions">
            <div className="badge badge-primary">Rating: {product.rating}</div>
            <div className="badge badge-secondary">
              Reviews: {product.numReviews}
            </div>
          </div>
          <p>
            {product.description.length > 90
              ? product.description.substring(0, 90).trim() + "..."
              : product.description}
          </p>
          <div className="card-actions items-center justify-end">
            <div className="">${product.price}</div>
            <button className="btn btn-sm btn-accent">Buy Now</button>
            <button className="btn btn-sm btn-primary">
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
