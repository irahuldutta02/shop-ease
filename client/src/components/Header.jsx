import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";

export const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [smScreen, setSmScreen] = useState(false);

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
      <div className="flex justify-center items-center fixed w-full bg-neutral">
        <div className="navbar bg-neutral z-50 max-w-6xl">
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

          <div className="flex-1 flex justify-start items-center">
            <img src="/assets/logo-rectangle.svg" alt="logo" className="w-36" />
          </div>
          <div className="flex-none flex gap-4">
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
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <MdOutlineShoppingCart size={25} />
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost flex justify-center items-center btn-circle avatar rounded-full overflow-hidden"
              >
                {/* <img
                src="https://i.postimg.cc/Ghyh5hDN/ai-image-rahuldutta-4.jpg"
                alt="profile-image"
                width={"100%"}
              /> */}
                <RxDotsHorizontal size={25} />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {smScreen && openDrawer && (
        <div className="bg-neutral rounded-lg fixed w-full flex justify-center items-center p-4 pt-20">
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
