import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/list`);

        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const currency = "Rs. ";
  const delivery_fee = 100;
  const navigate = useNavigate();

  // cartItems shape: { [productId]: quantity }
  const [cartItems, setCartItems] = useState({});

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Auth token — read from localStorage once on load, so a refresh
  // doesn't log the user out. Every login/logout writes through here.
  const [token, setTokenState] = useState(localStorage.getItem("token") || "");

  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const [adminToken, setAdminTokenState] = useState(
    localStorage.getItem("adminToken") || "",
  );

  const setAdminToken = (newToken) => {
    setAdminTokenState(newToken);
    if (newToken) {
      localStorage.setItem("adminToken", newToken);
    } else {
      localStorage.removeItem("adminToken");
    }
  };

  const logout = () => {
    setToken("");
    navigate("/login");
  };

  // TEMP: orders live in memory until the backend Order route exists.
  // Once ready, replace this with an Axios GET on mount + POST on placeOrder.
  const [orders, setOrders] = useState([]);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      _id: `order_${Date.now()}`,
      items: orderDetails.items,
      amount: orderDetails.amount,
      address: orderDetails.address,
      status: "Order Placed",
      date: new Date().toISOString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems({});
    return newOrder;
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getUserOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${API_URL}/api/order/userorders`,
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, [token]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = quantity;
      }
      return updated;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const product = products.find((p) => p._id === itemId);
      if (!product) return total;
      return total + product.price * qty;
    }, 0);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    clearCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartCount,
    getCartAmount,
    orders,
    placeOrder,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    token,
    setToken,
    adminToken,
    setAdminToken,
    logout,
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
