import { useContext } from "react";
import { Link } from "react-router-dom";
import { assets, occasionCategories } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import CategoryTile from "../components/CategoryTile";

const Home = () => {
  const { products } = useContext(ShopContext);
  const latestProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <div className="flex flex-col sm:flex-row border border-gray-400 rounded overflow-hidden sm:h-[400px]">
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
          <div className="text-gray-800">
            <div className="flex items-center gap-2">
              <p className="w-8 md:w-11 h-[2px] bg-gray-700"></p>
              <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
            </div>
            <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
              <p className="w-8 md:w-11 h-[1px] bg-gray-700"></p>
            </div>
          </div>
        </div>
        <img
          src={assets.hero_img}
          className="w-full sm:w-1/2 h-64 sm:h-full object-cover"
          alt=""
        />
      </div>

      {/* Shop by occasion */}
      <div className="my-16">
        <div className="text-center mb-8">
          <Title text1="SHOP BY" text2="OCCASION" />
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

      {/* Latest products */}
      <div className="my-16 text-center">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          A small, rotating set of picks, front and center.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            images={item.images}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
