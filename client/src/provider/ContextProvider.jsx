import { useState } from "react";
import {
  CartConfirmModalContext,
  OpenSearchDrawerContext,
  ThemeContext,
} from "../context";

export const ContextProvider = ({ children }) => {
  const getThemeFromLocalStorage = localStorage.getItem("theme");
  if (getThemeFromLocalStorage === null) {
    localStorage.setItem("theme", "dark");
  }
  const [theme, setTheme] = useState(getThemeFromLocalStorage || "dark");

  const [showCartConfirmModal, setShowCartConfirmModal] = useState(false);
  const [doNotShowAgainCartModal, setDoNotShowAgainCartModal] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSearchMenu, setOpenSearchMenu] = useState(false);

  return (
    <>
      <OpenSearchDrawerContext.Provider
        value={{ openDrawer, setOpenDrawer, openSearchMenu, setOpenSearchMenu }}
      >
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <CartConfirmModalContext.Provider
            value={{
              showCartConfirmModal,
              setShowCartConfirmModal,
              doNotShowAgainCartModal,
              setDoNotShowAgainCartModal,
            }}
          >
            {children}
          </CartConfirmModalContext.Provider>
        </ThemeContext.Provider>
      </OpenSearchDrawerContext.Provider>
    </>
  );
};
