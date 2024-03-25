import { useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { GoShoppingComponents } from "../components/GoShoppingComponents";

export const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [address, setAddress] = useState(
    shippingAddress?.address?.length > 0
      ? shippingAddress
      : {
          address: "",
          city: "",
          postalCode: "",
          country: "",
        }
  );

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !address.address.trim() ||
      !address.city.trim() ||
      !address.postalCode.trim() ||
      !address.country.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    dispatch(
      saveShippingAddress({
        address: address.address.trim(),
        city: address.city.trim(),
        postalCode: address.postalCode.trim(),
        country: address.country.trim(),
      })
    );
    navigate("/payment");
  };

  if (cartItems.length === 0) {
    return <GoShoppingComponents />;
  }

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full min-h-screen pt-20 pb-10">
        <div className="flex justify-start items-center flex-col gap-4 w-full max-w-6xl p-4">
          {/* breadcrumbs */}
          <div className="text-sm breadcrumbs flex justify-start w-full">
            <ul>
              <li>
                <Link
                  to={"/cart"}
                  className=" flex justify-center items-center gap-2"
                >
                  <MdOutlineShoppingCart />
                  Cart
                </Link>
              </li>
              <li>
                <Link to={`/shipping`}>Shipping</Link>
              </li>
            </ul>
          </div>
          <form
            className="card-body w-full max-w-80 md:max-w-96"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-center items-center text-3xl text-center">
              <h1>Shipping Details</h1>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                name="address"
                value={address.address}
                onChange={handleChange}
                type="text"
                placeholder="address"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                name="city"
                value={address.city}
                onChange={handleChange}
                type="text"
                placeholder="city"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Postal Code</span>
              </label>
              <input
                name="postalCode"
                value={address.postalCode}
                onChange={handleChange}
                type="text"
                placeholder="postal code"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <input
                name="country"
                value={address.country}
                onChange={handleChange}
                type="text"
                placeholder="country"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex-row flex w-full gap-4 mt-6 justify-center items-center">
              <button
                className="btn btn-sm btn-primary w-full"
                onClick={handleSubmit}
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
