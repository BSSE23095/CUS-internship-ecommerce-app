import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const found = products.find((p) => p._id === productId);
    setProductData(found || null);
    setSelectedImage(found?.images?.[0] || null);
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="pt-10 text-center text-gray-500">Loading product...</div>
    );
  }

  return (
    <div className="border-t pt-10">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="sm:w-1/2 flex flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnail strip — only shows if there's more than one image */}
          {productData.images.length > 1 &&  (
            <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-visible">
              {productData.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 object-cover rounded cursor-pointer border-2 flex-shrink-0 ${
                    selectedImage === img
                      ? "border-gray-800"
                      : "border-transparent"
                  }`}
                  alt={`${productData.name} view ${idx + 1}`}
                />
              ))}
            </div>
          )}
          <div className="flex-1 aspect-square rounded overflow-hidden bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={selectedImage}
              alt={productData.name}
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">
            {productData.description}
          </p>
          <button
            onClick={() => addToCart(productData._id)}
            className="bg-black text-white px-8 py-3 text-sm mt-6 hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Category: {productData.category}</p>
            <p>Cash on delivery available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
