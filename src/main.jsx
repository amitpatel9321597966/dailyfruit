import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//import CartProvider from "./context/CartContext";//
import "./index.css";
import CartProvider, { CartContext } from "./context/cartcontext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </BrowserRouter>
);
