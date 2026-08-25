import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { occasionCategories } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const PAGE_SIZE = 12;

const Category = () => {
  const { categoryName } = useParams();
  const { products, search, showSearch } = useContext(ShopContext);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // categoryName comes from the URL in lowercase (e.g. "party"),
  // match it against the real casing used in product data.
  const matchedCategory = occasionCategories.find(
    (c) => c.toLowerCase() === categoryName?.toLowerCase()
  );

  let categoryProducts = products.filter((p) => p.category === matchedCategory);

  if (showSearch && search) {
    categoryProducts = categoryProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [categoryName, search]);

  if (!matchedCategory) {
    return (
      <div className="border-t pt-10 text-center">
        <p className="text-gray-500">That category doesn't exist.</p>
        <Link to="/categories" className="underline text-sm">
          Back to categories
        </Link>
      </div>
    );
  }

  const visibleProducts = categoryProducts.slice(0, visibleCount);

  return (
    <div className="border-t pt-10">
      <div className="flex items-center justify-between mb-6">
        <Title text1={matchedCategory.toUpperCase()} text2="COLLECTION" />
        <p className="text-sm text-gray-500">{categoryProducts.length} pieces</p>
      </div>

      {categoryProducts.length === 0 ? (
        <p className="text-gray-500 text-sm">No products in this category yet.</p>
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

          {visibleCount < categoryProducts.length && (
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
  );
};

export default Category;
