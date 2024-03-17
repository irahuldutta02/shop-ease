import { useNavigate } from "react-router-dom";

export const Product = ({ product }) => {
  const navigate = useNavigate();

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
          <h2 className="card-title ">{product.name}</h2>
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
          </div>
        </div>
      </div>
    </>
  );
};
