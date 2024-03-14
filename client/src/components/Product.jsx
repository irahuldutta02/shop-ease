import { FaPlus } from "react-icons/fa6";

export const Product = ({ product }) => {
  return (
    <>
      <div className="card max-w-80 h-[30rem] bg-neutral shadow-xl">
        <figure className="w-full h-45">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>

        <div className="card-body gap-3">
          <h2 className="card-title">{product.name}</h2>
          <div className="card-actions">
            <div className="badge badge-primary">Rating: {product.rating}</div>
            <div className="badge badge-secondary">
              Reviews: {product.numReviews}
            </div>
          </div>
          <p>{product.description.substring(0, 90)}</p>
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
