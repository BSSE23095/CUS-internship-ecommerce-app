import mongoose from "mongoose";

 const productSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: {type:String, required:true},
    description: {type:String, required:true},
    price : {type:Number, required:true},
    type:{type:String, required:true},
    category:{type:String, required:true},
    images: {type:[String], required:true},
 })

 const productModel=mongoose.models.product || mongoose.model("product", productSchema)

 export default productModel