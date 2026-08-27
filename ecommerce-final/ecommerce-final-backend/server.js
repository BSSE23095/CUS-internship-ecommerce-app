import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectdb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

// --------------------------------------------------
// App configuration
// --------------------------------------------------

const app = express();
const port = process.env.PORT || 4000;

// --------------------------------------------------
// ES module __dirname setup
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------------
// Database & Cloudinary
// --------------------------------------------------

connectdb();
connectCloudinary();

// --------------------------------------------------
// Middlewares
// --------------------------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// --------------------------------------------------
// API routes
// --------------------------------------------------

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// --------------------------------------------------
// Frontend
// --------------------------------------------------

const frontendPath = path.join(__dirname, "public");

// Serve React/Vite static files
app.use(express.static(frontendPath));

// React Router fallback
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});