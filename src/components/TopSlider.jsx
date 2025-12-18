import { useEffect, useState } from "react";

const slides = [
  {
    title: "Fresh Fruits Daily",
    subtitle: "Direct from local market",
    image: "/slideapple.png",
  },
  {
    title: "Seasonal Fruits",
    subtitle: "Best price & quality",
    image: "/slidemango.png",
  },
  {
    title: "Fast Delivery",
    subtitle: "Bandra to Borivali",
    image: "/delivery2.png",
  },
  {
    title: "Order on WhatsApp",
    subtitle: "Easy & quick order",
    image: "/whatsapp.png",
  },
];

export default function TopSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden mt-4">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full    "
          >
           
            {/*iimage*/}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-30  rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
