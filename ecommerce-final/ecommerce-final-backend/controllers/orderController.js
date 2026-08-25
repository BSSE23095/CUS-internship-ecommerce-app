import orderModel from "../models/orderModel.js";

// place a COD order
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "Cart is empty" });
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        res.json({ success: true, message: "Order placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get orders for the logged-in user
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { placeOrder, userOrders };