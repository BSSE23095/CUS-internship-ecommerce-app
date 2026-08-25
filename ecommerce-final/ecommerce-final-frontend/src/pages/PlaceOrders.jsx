import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const PlaceOrders = () => {
  const {
    products,
    cartItems,
    currency,
    delivery_fee,
    getCartAmount,
    token,
    clearCart,
    navigate,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please log in to place an order.");
      navigate("/login");
      return;
    }

    const { firstName, lastName, email, street, city, phone } = formData;
    if (!firstName || !lastName || !email || !street || !city || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    const items = Object.entries(cartItems).map(([itemId, quantity]) => {
      const product = products.find((p) => p._id === itemId);
      return { productId: itemId, name: product?.name, quantity, price: product?.price };
    });

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/place",
        {
          items,
          amount: getCartAmount() + delivery_fee,
          address: formData,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        clearCart();
        navigate("/orders");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Order failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-8 pt-10 border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            className="border border-gray-300 rounded py-2 px-3 w-full text-sm"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            className="border border-gray-300 rounded py-2 px-3 w-full text-sm"
          />
        </div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email"
          className="border border-gray-300 rounded py-2 px-3 w-full text-sm"
        />
        <input
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street address"
          className="border border-gray-300 rounded py-2 px-3 w-full text-sm"
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="border border-gray-300 rounded py-2 px-3 w-full text-sm"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
            className="border border-gray-300 rounded py-2 px-3 w-full text-sm"
          />
        </div>
      </div>

      <div className="w-full sm:max-w-[400px]">
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="flex flex-col gap-3 mb-6">
          <label className="flex items-center gap-3 border border-gray-800 rounded p-3 cursor-pointer">
            <input type="radio" name="paymentMethod" defaultChecked />
            <span className="text-sm">Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-3 border border-gray-300 rounded p-3 text-gray-400 cursor-not-allowed">
            <input type="radio" name="paymentMethod" disabled />
            <span className="text-sm">Card / Online Payment (coming soon)</span>
          </label>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount().toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <p>Delivery Fee</p>
          <p>
            {currency}
            {delivery_fee.toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between font-medium border-t pt-2 mb-6">
          <p>Total</p>
          <p>
            {currency}
            {(getCartAmount() + delivery_fee).toFixed(2)}
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white text-sm px-8 py-3 w-full hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Placing order..." : "PLACE ORDER"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrders;