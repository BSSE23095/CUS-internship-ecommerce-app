
/**
 * One-time seed script: uploads each product's local images to Cloudinary,
 * then inserts the product straight into MongoDB. Bypasses the HTTP API
 * and Postman entirely, no more typing test data by hand.
 *
 * WHERE TO PUT THIS FILE:
 * Save as seed.js in your BACKEND folder (same level as server.js).
 *
 * BEFORE RUNNING:
 * 1. Place sea_products_tagged.json in the same backend folder as this script.
 * 2. Update FRONTEND_IMAGES_PATH below to point at your frontend's
 *    public/products folder (see the comment next to it).
 * 3. Make sure your .env has MONGODB_URI and your Cloudinary credentials.
 *
 * TO RUN (from your backend folder):
 *     node seed.js
 *
 * This uploads ~117 products worth of images, it will take a few minutes.
 * Safe to re-run if it crashes partway through, it skips products already
 * saved and keeps going instead of stopping on one bad product.
 */
 
import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import connectdb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import productModel from './models/productModel.js';
 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
 
// EDIT THIS: path to your frontend's public/products folder, where the
// actual .webp files live. Adjust the "../" count if your folders are
// nested differently.
const FRONTEND_IMAGES_PATH = path.join(
  __dirname,
  '../ecommerce-final-frontend/public/products'
);
 
const PRODUCTS_JSON_PATH = path.join(__dirname, 'sea_products_tagged.json');
 
async function uploadImageToCloudinary(localFilename) {
  const filePath = path.join(FRONTEND_IMAGES_PATH, localFilename);
 
  if (!fs.existsSync(filePath)) {
    console.log(`  Missing file, skipping: ${localFilename}`);
    return null;
  }
 
  const result = await cloudinary.uploader.upload(filePath, {
    resource_type: 'image',
  });
  return result.secure_url;
}
 
async function seed() {
  await connectdb();
  connectCloudinary();
 
  const raw = fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8');
  const products = JSON.parse(raw);
 
  console.log(`Seeding ${products.length} products...\n`);
 
  let successCount = 0;
  let skipCount = 0;
 
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    console.log(`[${i + 1}/${products.length}] ${p.name}`);
 
    try {
      const existing = await productModel.findById(p._id);
      if (existing) {
        console.log(`  Already in DB, skipping.`);
        skipCount++;
        continue;
      }
 
      const filenames = (p.images || []).map((imgPath) =>
        imgPath.replace('/products/', '')
      );
 
      const uploadedUrls = [];
      for (const filename of filenames) {
        const url = await uploadImageToCloudinary(filename);
        if (url) uploadedUrls.push(url);
      }
 
      if (uploadedUrls.length === 0) {
        console.log(`  No images uploaded, skipping this product.`);
        skipCount++;
        continue;
      }
 
      const productDoc = new productModel({
        _id: p._id,
        name: p.name,
        description: p.description || "A handcrafted piece from our collection.",
        price: p.price,
        type: p.type,
        category: p.category,
        images: uploadedUrls,
      });
 
      await productDoc.save();
      successCount++;
    } catch (err) {
      console.log(`  Failed on this product, skipping: ${err.message}`);
      skipCount++;
    }
  }
 
  console.log(`\nDone. ${successCount} products saved, ${skipCount} skipped.`);
  process.exit(0);
}
 
seed().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
 
