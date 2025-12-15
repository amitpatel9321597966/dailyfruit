import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  let totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  if (couponApplied) totalPrice *= 0.9;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "daily10") {
      setCouponApplied(true);
      alert("Coupon applied! 10% discount");
    } else {
      alert("Invalid coupon");
    }
  };

  // backend order send
  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter address");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter valid 10 digit mobile number");
      return;
    }

    try {
      const res = await fetch(
        "https://YOUR-RAILWAY-BACKEND-URL/send-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            mobile,
            items: cart,
            total: totalPrice.toFixed(2),
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        window.open(data.whatsappUrl, "_blank");
      } else {
        alert("Order failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 p-10 text-lg">No items added yet.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow rounded-lg"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price: ₹{item.price}/kg</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    –
                  </button>
                  <span className="text-lg font-semibold">{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-gray-300 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 font-semibold">
                  Total: ₹{item.price * item.qty}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="Enter coupon daily10"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="px-4 py-2 border rounded"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Apply Coupon
            </button>
          </div>

          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold">
              SubTotal: ₹{totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded mt-3"
            >
              Place Order
            </button>
          </div>

          {showOrderForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-xl font-bold mb-3">Enter Details</h2>

                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border px-3 py-2 mb-3"
                />

                <input
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full border px-3 py-2 mb-4"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Send on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
