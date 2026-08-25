import mongoose from "mongoose";
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
const connectdb = async () => {
    mongoose.connection.on('connected', () => {
        console.log('DB connected');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce-final`);
};

export default connectdb;