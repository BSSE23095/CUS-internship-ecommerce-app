import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const PAGE_SIZE = 16;
const PRODUCT_TYPES = ["Earrings", "Necklace", "Bangles", "Bundle"];

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [activeTypes, setActiveTypes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const toggleType = (e) => {
    const value = e.target.value;
    setActiveTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    );
  };

  let filteredProducts =
    activeTypes.length === 0
      ? products
      : products.filter((p) => activeTypes.includes(p.type));

  if (showSearch && search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTypes, search]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t">
      {/* Filter sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center gap-2 cursor-pointer sm:cursor-default"
        >
          FILTERS
        </p>

        <div
          className={`border border-gray-300 rounded pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            {PRODUCT_TYPES.map((type) => (
              <label key={type} className="flex gap-2 items-center">
                <input type="checkbox" value={type} onChange={toggleType} />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <Title text1="ALL" text2="PRODUCTS" />
          <p className="text-sm text-gray-500">
            {filteredProducts.length} pieces
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No products match this filter.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {visibleProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  images={item.images}
                  price={item.price}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="border border-gray-400 text-gray-700 text-sm px-8 py-3 hover:bg-gray-50 transition"
                >
                  LOAD MORE
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;
