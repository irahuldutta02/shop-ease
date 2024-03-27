import { useContext, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  IoClose,
  IoMenu,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/userSlice";

export const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [smScreen, setSmScreen] = useState(false);

  const { theme, setTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { userInfo } = useSelector((state) => state.user);
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      const res = await logoutApi().unwrap();
      toast.success(res.message);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          error?.error ||
          "An error occurred"
      );
    }
  };

  const renderProfileMenu = () => {
    return (
      <>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex justify-center items-center btn-circle avatar rounded-full overflow-hidden"
          >
            <RxDotsHorizontal size={25} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box  flex justify-center items-center gap-2"
          >
            {/* profile info and go to profile */}
            {userInfo && (
              <li className="w-full">
                <div
                  className="bg-neutral w-full flex flex-col justify-center items-center p-2"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <div>
                    {userInfo?.name.length > 30
                      ? userInfo?.name.slice(0, 30) + "..."
                      : userInfo?.name}
                  </div>
                  <div>
                    {userInfo?.email.length > 30
                      ? userInfo?.email.slice(0, 30) + "..."
                      : userInfo?.email}
                  </div>
                  {userInfo?.isAdmin && (
                    <div className="badge badge-primary">Admin</div>
                  )}
                </div>
              </li>
            )}
            {/* login signup */}
            {!userInfo && (
              <>
                <li
                  className="w-full flex justify-center items-center"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <a className="w-full flex justify-center">LogIn</a>
                </li>
                <li
                  className="w-full flex justify-center items-center"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  <a className="w-full flex justify-center">SignUp</a>
                </li>
              </>
            )}
            {/* Admin/users */}
            {userInfo && userInfo?.isAdmin && (
              <li className="w-full flex justify-center items-center">
                <a
                  onClick={() => {
                    navigate("/admin/users");
                  }}
                  className="w-full flex justify-center"
                >
                  Users
                </a>
              </li>
            )}
            {/* admin/products */}
            {userInfo && userInfo?.isAdmin && (
              <li className="w-full flex justify-center items-center">
                <a
                  onClick={() => {
                    navigate("/admin/products");
                  }}
                  className="w-full flex justify-center"
                >
                  Products
                </a>
              </li>
            )}
            {/* Admin/orders */}
            {userInfo && userInfo?.isAdmin && (
              <li className="w-full flex justify-center items-center">
                <a
                  onClick={() => {
                    navigate("/admin/orders");
                  }}
                  className="w-full flex justify-center"
                >
                  Orders
                </a>
              </li>
            )}
            {/* logout */}
            {userInfo && (
              <li className="w-full flex justify-center items-center">
                <a
                  onClick={handleLogOut}
                  className="w-full flex justify-center"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-sm"></span>
                  ) : (
                    "Logout"
                  )}
                </a>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    if (media.matches) {
      setSmScreen(true);
    } else {
      setSmScreen(false);
    }
    media.addEventListener("change", (e) => {
      if (e.matches) {
        setSmScreen(true);
      } else {
        setSmScreen(false);
      }
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center fixed w-full z-[10] bg-neutral">
        <div className="navbar bg-neutral  max-w-6xl">
          {/* sm screen menu */}
          {smScreen && (
            <div className="flex-none">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                {!openDrawer ? <IoMenu size={25} /> : <IoClose size={25} />}
              </button>
            </div>
          )}

          {/* logo */}
          <div className="flex-1">
            <img
              src="/assets/logo-rectangle.svg"
              alt="logo"
              className="w-36 btn btn-link"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>

          <div className="flex-none flex gap-4">
            {/* search bar */}
            {!smScreen && (
              <div className="flex justify-center items-center">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="Search" />
                  <button className="btn btn-sm">
                    <FaSearch />
                  </button>
                </label>
              </div>
            )}

            {/* cart */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <MdOutlineShoppingCart size={25} />
                  <span className="badge badge-sm indicator-item">
                    {cart?.cartItems?.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                {cartItems.length > 0 ? (
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      {cart?.cartItems?.length} Items
                    </span>
                    <span className="text-info">
                      Subtotal: ${cart?.totalPrice}
                    </span>
                    <div className="card-actions">
                      <button
                        onClick={() => {
                          navigate("/cart");
                        }}
                        className="btn btn-sm btn-primary btn-block"
                      >
                        View cart
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="card-body text-center">
                    <p>Add some items to the Cart</p>
                  </div>
                )}
              </div>
            </div>

            {/* theme toggler */}
            <div
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                localStorage.setItem(
                  "theme",
                  theme === "dark" ? "light" : "dark"
                );
              }}
              className="btn btn-ghost btn-circle"
            >
              {theme === "dark" ? (
                <IoSunnyOutline size={25} className="swap-off" />
              ) : (
                <IoMoonOutline size={25} className="swap-on" />
              )}
            </div>

            {/* dot menu */}
            {renderProfileMenu()}
          </div>
        </div>
      </div>

      {/* sm screen search bar menu */}
      {smScreen && openDrawer && (
        <div className="bg-neutral rounded-lg fixed w-full flex justify-center items-center p-4 pt-20 z-[9]">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <button className="btn btn-sm">
              <FaSearch />
            </button>
          </label>
        </div>
      )}
    </>
  );
};
