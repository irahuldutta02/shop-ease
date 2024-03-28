import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateProductMutation } from "../../slices/productApiSlice";
import { useNavigate } from "react-router-dom";

export const CreateProductScreen = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    countInStock: 0,
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const validate = () => {
    if (
      newProduct.name.trim() === "" ||
      newProduct.image.trim() === "" ||
      newProduct.brand.trim() === "" ||
      newProduct.category.trim() === "" ||
      newProduct.description.trim() === "" ||
      newProduct.price < 0 ||
      newProduct.countInStock < 0
    ) {
      toast.error("Please fill all the fields correctly");
      return false;
    }

    if (isNaN(newProduct.price) || isNaN(newProduct.countInStock)) {
      toast.error("Price and Stock should be a number");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await createProduct(newProduct).unwrap();
      setNewProduct({
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        countInStock: 0,
      });
      toast.success("Product Created Successfully");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to create product");
    }
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          <div className="w-full flex justify-center items-center text-center flex-col">
            <h1 className="text-3xl">Create Product</h1>
          </div>
          <div className="w-full flex justify-center items-center text-center flex-col">
            <div className="w-full max-w-80 md:max-w-96 flex justify-center items-center flex-col">
              {/* name */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Name of the product</span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  placeholder="name"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              {/* image */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Image of the product</span>
                </div>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  placeholder="image"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              {/* brand */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Brand of the product</span>
                </div>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleChange}
                  placeholder="brand"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              {/* Category */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Category of the product</span>
                </div>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category}
                  onChange={handleChange}
                  placeholder="category"
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              {/* description */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Description of the product</span>
                </div>
                <textarea
                  name="description"
                  placeholder="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full min-h-32 max-w-xs"
                ></textarea>
              </label>
              {/* price */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Price of the product</span>
                </div>
                <input
                  type="number"
                  name="price"
                  placeholder="price"
                  value={newProduct.price}
                  onChange={handleChange}
                  min={0}
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              {/* countInStock */}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Stock of the product</span>
                </div>
                <input
                  type="number"
                  name="countInStock"
                  value={newProduct.countInStock}
                  onChange={handleChange}
                  placeholder="stock"
                  min={0}
                  className="input input-sm input-bordered w-full max-w-xs"
                />
              </label>
              {/* buttons */}
              <div className="w-full pt-5 flex justify-center items-center gap-2">
                {/* submit */}
                <button
                  onClick={handleSubmit}
                  className="btn btn-sm btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Create Product"
                  )}
                </button>
                {/* populate with demo product */}
                <button
                  onClick={() => {
                    setNewProduct({
                      name: "Demo Product",
                      image: "https://placehold.co/600x400/png",
                      brand: "Demo Brand",
                      category: "Demo Category",
                      description: "Demo Description",
                      price: 100,
                      countInStock: 10,
                    });
                  }}
                  disabled={isLoading}
                  className="btn btn-sm btn-accent"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Demo Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
