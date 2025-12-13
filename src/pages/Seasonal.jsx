import fruits from "../data/fruits";
import FruitCard from "../components/FruitCard";

export default function Seasonal() {
  return (
    <div className="pt-24 px-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Seasonal Fruits</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {fruits.slice(0, 8).map((fruit) => (
          <FruitCard
            key={fruit.id}
            id={fruit.id}
            name={fruit.name}
            price={fruit.price}
            image={fruit.img}
          />
        ))}
      </div>
    </div>
  );
}
