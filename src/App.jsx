import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Seasonal from "./pages/Seasonal";
import Allfruit from "./pages/Allfruit";
import Cart from "./pages/Cart";
import "./index.css";
import "./App.css";

export default function App() {
  return (
    <div className="pb-10">
      {/* Navbar */}
      <Navbar />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Allfruit />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
}

