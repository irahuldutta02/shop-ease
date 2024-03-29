import { useState } from "react";
import { CartConfirmModalContext, ThemeContext } from "../context";

export const ContextProvider = ({ children }) => {
  const getThemeFromLocalStorage = localStorage.getItem("theme");
  if (getThemeFromLocalStorage === null) {
    localStorage.setItem("theme", "dark");
  }
  const [theme, setTheme] = useState(getThemeFromLocalStorage || "dark");

  const [showCartConfirmModal, setShowCartConfirmModal] = useState(false);
  const [doNotShowAgainCartModal, setDoNotShowAgainCartModal] = useState(false);

  return (
    <>
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
    </>
  );
};
