import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { occasionCategories } from "../assets/assets";
import Title from "../components/Title";
import CategoryTile from "../components/CategoryTile";

const Categories = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="border-t pt-10">
      <div className="text-center mb-10">
        <Title text1="SHOP BY" text2="OCCASION" />
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Find the right pieces for wherever you're headed, from an
          ordinary Tuesday to your wedding day.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {occasionCategories.map((cat) => {
          const itemsInCategory = products.filter((p) => p.category === cat);
          return (
            <CategoryTile
              key={cat}
              name={cat}
              previewImage={itemsInCategory[0]?.images?.[0]}
              count={itemsInCategory.length}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
