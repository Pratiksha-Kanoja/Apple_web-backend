import mongoose, { Schema } from "mongoose";

const products = new Schema({
    new1:String,
    title:String,
    image:String,
    image2:Array(Object),
    price:String,
    bttn:String,
    info: Array(Object)
})

export default mongoose.model("Products",products)