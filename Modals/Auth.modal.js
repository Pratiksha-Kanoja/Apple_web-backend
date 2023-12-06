import mongoose, { Schema } from "mongoose";

const user = new Schema({
    firstname:String,
    lastname:String,
    country:String,
    DOB:String,
    email:String,
    password:String,
    confirmpassword:String,
    countrycode:String,
    phoneNo:Number
})

export default mongoose.model("User",user);