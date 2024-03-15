import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ThemeContext } from "./context";

export const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div data-theme={theme === "dark" ? "coffee" : "wireframe"}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
