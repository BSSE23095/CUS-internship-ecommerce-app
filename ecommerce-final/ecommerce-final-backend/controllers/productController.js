import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import productModel from "../models/productModel.js";

//add product
const addProduct = async (req, res) => {
    try {
        const { _id, name, description, price, type, category } = req.body;

        if (!name || !description || !price || !type || !category) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];
        const image5 = req.files?.image5?.[0];

        const images = [image1, image2, image3, image4, image5].filter(Boolean);

        if (images.length === 0) {
            return res.json({ success: false, message: "At least one image is required" });
        }

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                    timeout: 15000,
                });
                return result.secure_url;
            })
        );

        images.forEach((item) => {
            fs.unlink(item.path, (err) => {
                if (err) console.log("Failed to delete temp file:", item.path, err);
            });
        });

        const productData = {
            _id: _id || `product_${Date.now()}`,
            name,
            description,
            price: Number(price),
            type,
            category,
            images: imagesUrl,
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// update product details (no image changes, text/number fields only)
const updateProduct = async (req, res) => {
    try {
        const { _id, name, description, price, type, category } = req.body;

        if (!_id) {
            return res.json({ success: false, message: "Product id is required" });
        }

        const product = await productModel.findById(_id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = Number(price);
        if (type) product.type = type;
        if (category) product.category = category;

        await product.save();

        res.json({ success: true, message: "Product updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//remove product
const removeProduct = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.json({ success: false, message: "Product id is required" });
        }

        const product = await productModel.findById(_id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        await productModel.findByIdAndDelete(_id);
        res.json({ success: true, message: "Product removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//product info
const infoProduct = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.json({ success: false, message: "Product id is required" });
        }

        const product = await productModel.findById(_id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProduct, removeProduct, infoProduct, updateProduct };