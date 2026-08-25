import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart, delivery_fee, navigate } =
    useContext(ShopContext);

  const cartRows = Object.entries(cartItems)
    .map(([itemId, quantity]) => {
      const product = products.find((p) => p._id === itemId);
      if (!product) return null;
      return { ...product, quantity };
    })
    .filter(Boolean);

  const subtotal = cartRows.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = cartRows.length > 0 ? subtotal + delivery_fee : 0;

  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartRows.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Your cart is empty.{" "}
          <span onClick={() => navigate("/collection")} className="underline cursor-pointer">
            Browse products
          </span>
        </p>
      ) : (
        <>
          <div>
            {cartRows.map((item) => (
              <div
                key={item._id}
                className="py-4 border-t border-b grid grid-cols-[4fr_1fr_1fr] sm:grid-cols-[4fr_2fr_1fr] items-center gap-4"
              >
                <div className="flex items-start gap-4">
                  <img className="w-16 sm:w-20" src={item.images?.[0]} alt={item.name} />
                  <div>
                    <p className="text-sm sm:text-base font-medium">{item.name}</p>
                    <p className="text-sm">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-self-start sm:justify-self-center">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-7 h-7 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-7 h-7 border border-gray-300 rounded hover:bg-gray-50 text-sm"
                  >
                    +
                  </button>
                </div>
                <img
                  onClick={() => removeFromCart(item._id)}
                  src={assets.bin_icon}
                  className="w-4 mr-4 cursor-pointer justify-self-end"
                  alt="remove"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end my-10">
            <div className="w-full sm:w-[400px]">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {currency}
                    {subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Fee</p>
                  <p>
                    {currency}
                    {delivery_fee.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <p>Total</p>
                  <p>
                    {currency}
                    {total.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm px-8 py-3 my-6 w-full hover:bg-gray-800 transition"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
