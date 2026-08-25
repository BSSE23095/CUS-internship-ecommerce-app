import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);
  console.log("Product image:", images);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden rounded aspect-square bg-gray-100">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
          src={images?.[0]}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-2 min-h-[2.5rem]">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
