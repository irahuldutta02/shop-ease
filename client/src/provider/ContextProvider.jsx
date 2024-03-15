import { useState } from "react";
import { ThemeContext } from "../context";

export const ContextProvider = ({ children }) => {
  const getThemeFromLocalStorage = localStorage.getItem("theme");
  if (getThemeFromLocalStorage === null) {
    localStorage.setItem("theme", "dark");
  }
  const [theme, setTheme] = useState(getThemeFromLocalStorage);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};
