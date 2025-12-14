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

  const handlePlaceOrder = () => {
    if (!address) {
      alert("Please enter address");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    // ✅ Server.js style WhatsApp message
    const message =
      "🆕 NEW ORDER FROM DAILYFRUIT 🍎🥭\n\n" +
      "📦 Fruit Details:\n" +
      cart
        .map((item) => `${item.name} x ${item.qty} = ₹${item.price * item.qty}`)
        .join("\n") +
      "\n\n📍 Address: " + address +
      "\n📞 Mobile: " + mobile +
      "\n💰 Total Amount: ₹" + totalPrice.toFixed(2) +
      "\n\n🙏 Thank you for shopping with Daily Fruit!" +
      "\n\n⚠️ Fruit seller will contact you in a few minutes. If not, please call us after 5 minutes.";

    const whatsappNumber = "919321597966";
    const url = `https://wa.me/${whatsappNumber}?text=` + encodeURIComponent(message);

    window.open(url, "_blank");
  };

  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md w-max mx-auto mt-6">
        <span className="font-semibold">
          Order between Bandra to Borivali
        </span>
      </div>

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
                    className={`px-3 py-1 rounded ${
                      item.qty === 10 ? "bg-gray-400" : "bg-gray-300"
                    }`}
                    disabled={item.qty === 10}
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
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <input
              type="text"
              placeholder="Enter coupon daily10"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply Coupon
            </button>
          </div>

          <div className="text-right mt-6">
            <h2 className="text-2xl font-bold mb-4">
              SubTotal: ₹{totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={() => setShowOrderForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>

          {showOrderForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Enter Details</h2>

                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-3"
                />

                <input
                  type="tel"
                  placeholder="10 digit mobile number"
                  value={mobile}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) setMobile(value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-1"
                />
                <p className="text-sm text-gray-500 mb-3">
                  Mobile number must be exactly 10 digits
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="px-4 py-2 rounded border"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
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
