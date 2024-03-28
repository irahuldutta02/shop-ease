import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import { AdminRoutes } from "./components/AdminRoutes.jsx";
import { PrivateRoutes } from "./components/PrivateRoutes.jsx";
import "./index.css";
import { CartScreen } from "./screens/CartScreen.jsx";
import { ErrorScreen } from "./screens/ErrorScreen.jsx";
import { HomeScreen } from "./screens/HomeScreen.jsx";
import { LoginScreen } from "./screens/LoginScreen.jsx";
import { OrderScreen } from "./screens/OrderScreen.jsx";
import { PaymentScreen } from "./screens/PaymentScreen.jsx";
import { PlaceOrderScreen } from "./screens/PlaceOrderScreen.jsx";
import { ProductScreen } from "./screens/ProductScreen.jsx";
import { ProfileScreen } from "./screens/ProfileScreen.jsx";
import { ResetPass } from "./screens/ResetPass.jsx";
import { ShippingScreen } from "./screens/ShippingScreen.jsx";
import { SignupScreen } from "./screens/SignupScreen.jsx";
import { CreateProductScreen } from "./screens/admin/CreateProductScreen.jsx";
import { EditProductScreen } from "./screens/admin/EditProductScreen.jsx";
import { OrderListScreen } from "./screens/admin/OrderListScreen.jsx";
import { ProductListScreen } from "./screens/admin/ProductListScreen.jsx";
import { UserEditScreen } from "./screens/admin/UserEditScreen.jsx";
import store from "./store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/reset-password/:resetToken" element={<ResetPass />} />
      {/* private routes */}
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/place-order" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      {/* admin routes */}
      <Route path="/" element={<AdminRoutes />}>
        <Route path="/admin/users" element={<UserEditScreen />} />
        <Route path="/admin/products" element={<ProductListScreen />} />
        <Route path="/admin/orders" element={<OrderListScreen />} />
        <Route path="/admin/create" element={<CreateProductScreen />} />
        <Route path="/admin/edit/:id" element={<EditProductScreen />} />
      </Route>
      <Route path="*" element={<ErrorScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
