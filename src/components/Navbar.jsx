import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "./context/CartContext.jsx";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav
      className="fixed top-0 left-0 w-full 
      bg-emerald-700/80 backdrop-blur-lg 
      border-b border-black 
      text-white shadow-lg z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* logo with dailyfruit */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🍎</span>
          <h1 className="text-xl font-bold text-black">
            Daily<span className="text-red-600">Fruit</span>
          </h1>
        </Link>

        {/* desktop menu*/}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-green-300">All Fruits</Link>
          <Link to="/Seasonal" className="hover:text-green-300">Seasonal</Link>

          {/* foe destop cart with count */}
          <Link
            to="/cart"
            className="relative bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition"
          >
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* this is mobile menu button */}
        <button
          className="relative md:hidden text-2xl text-white border border-white/40 px-3 py-1 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          ☰
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* this is mobile menu */}
      {open && (
        <div className="md:hidden bg-emerald-700/90 backdrop-blur-md px-4 pb-4 space-y-2 border-t border-black/30">
          
          <Link to="/" onClick={() => setOpen(false)} className="block">
            <button className="w-full bg-green-900/80 text-white py-2 rounded-lg hover:bg-green-700 transition">
              All Fruits
            </button>
          </Link>

          <Link to="/Seasonal" onClick={() => setOpen(false)} className="block">
            <button className="w-full text-white py-2 rounded-lg hover:bg-green-700 transition">
              Seasonal
            </button>
          </Link>

          {/* for mobile zart countt */}
          <Link to="/cart" onClick={() => setOpen(false)} className="block">
            <button className="w-full bg-slate-800/80 text-white py-2 rounded-lg hover:bg-green-700 transition flex justify-center items-center gap-2">
              🛒 Cart
              {totalItems > 0 && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

        </div>
      )}
    </nav>
  );
}
