import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { currency, token } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/order/userorders",
          {},
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="border-t pt-10">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders placed yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4">
              <div className="flex justify-between text-sm mb-2">
                <p className="font-medium">
                  Order #{order._id.slice(-6)}
                </p>

                <p className="text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col gap-1 text-sm text-gray-600 mb-2">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm">
                <p>
                  Total: {currency}
                  {order.amount.toFixed(2)}
                </p>

                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;