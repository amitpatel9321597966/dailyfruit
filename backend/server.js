import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// WhatsApp order  to send where
app.post("/send-order", (req, res) => {
  const { address, mobile, items, total } = req.body;

  const sellerPhone = "9321597966"; // number ehere to send message

  const message = `
🍎 NEW FRUIT ORDER RECEIVED 🍇   // this all are message format

📌 Address: ${address}
📞 Mobile: ${mobile}

🧺 Items:
${items
  .map((i) => `${i.name} x ${i.qty} = ₹${i.qty * i.price}`)
  .join("\n")}

💰 Total Amount: ₹${total}

Please contact the customer and confirm payment.
`;

  const whatsappUrl =
    "https://wa.me/" +
    sellerPhone +
    "?text=" +
    encodeURIComponent(message);

  return res.json({ success: true, whatsappUrl });
});

app.listen(5000, () => {
  console.log("Server running on port 5000"); // for chech server is runnibg or not
});
