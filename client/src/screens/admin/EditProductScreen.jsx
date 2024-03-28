import { useEffect, useState } from "react";
import {
  useEditProductMutation,
  useGetProductDetailsQuery,
} from "../../slices/productApiSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export const EditProductScreen = () => {
  const { id } = useParams();

  const {
    data,
    error,
    isLoading: gettingProduct,
    refetch,
  } = useGetProductDetailsQuery(id);

  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    countInStock: 0,
  });

  useEffect(() => {
    if (data) {
      setNewProduct({
        name: data?.data?.name,
        image: data?.data?.image,
        brand: data?.data?.brand,
        category: data?.data?.category,
        description: data?.data?.description,
        price: data?.data?.price,
        countInStock: data?.data?.countInStock,
      });
      refetch();
    }
  }, [data, refetch]);

  const navigate = useNavigate();
  const [editProduct, { isLoading }] = useEditProductMutation();

  const handleChange = (e) => {
    setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const handleSubmit = async () => {
    if (!validate()) return;
    try {
      await editProduct({ id, newProduct }).unwrap();
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Error Updating Product");
    }
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          <div className="w-full flex justify-center items-center text-center flex-col">
            <h1 className="text-3xl">Edit Product</h1>
          </div>
          <div className="w-full flex justify-center items-center text-center flex-col">
            {!gettingProduct && !error && (
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
                    value={newProduct.image}
                    onChange={handleChange}
                    name="image"
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
                    <span className="label-text">
                      Description of the product
                    </span>
                  </div>
                  <textarea
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    placeholder="description"
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
                    value={newProduct.price}
                    onChange={handleChange}
                    placeholder="price"
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
                      "Update Product"
                    )}
                  </button>
                  {/* reset */}
                  <button
                    disabled={isLoading}
                    onClick={() => {
                      if (data) {
                        setNewProduct({
                          name: data?.data?.name,
                          image: data?.data?.image,
                          brand: data?.data?.brand,
                          category: data?.data?.category,
                          description: data?.data?.description,
                          price: data?.data?.price,
                          countInStock: data?.data?.countInStock,
                        });
                        refetch();
                      }
                    }}
                    className="btn btn-sm btn-accent"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
            {gettingProduct && (
              <div className="w-full flex justify-center items-center">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
