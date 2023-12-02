import { Router } from "express";
import { Addproduct, GetAllProducts, getSingleProduct } from "../Controllers/Products.controllers.js";

const productrouter = Router();

productrouter.post('/add-products',Addproduct);
productrouter.get('/get-all-products',GetAllProducts);
productrouter.get('/get-single-product',getSingleProduct);

export default productrouter;