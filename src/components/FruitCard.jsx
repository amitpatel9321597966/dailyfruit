import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function FruitCard({ id, name, price, image }) {
  const [added, setAdded] = useState(false);
  const { cart, addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    setAdded(true);
    addToCart({ id, name, price, img: image });
    setTimeout(() => setAdded(false), 2000);
  };

  const cartCount = cart.find((item) => item.id === id)?.qty || 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border-2 border-lime-200 hover:border-lime-400 transition flex flex-col relative">
      <img
        src={image}
        alt={name}
        className="w-full h-50 object-cover rounded-lg mb-3"
      />
      <h2 className="text-xl font-bold text-purple-700">{name}</h2>
      <p className="text-gray-600 font-semibold">₹{price} / kg</p>

      {/*quantity counting */}
      {cartCount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
          {cartCount}
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className={`mt-auto w-full font-semibold py-2 rounded-lg transition flex justify-center items-center ${
          added
            ? "bg-green-500 text-white"
            : "bg-lime-500 text-black hover:bg-lime-600"
        }`}
      >
        {added ? "✔️ Added" : "Add to Cart"}
      </button>
    </div>
  );
}


