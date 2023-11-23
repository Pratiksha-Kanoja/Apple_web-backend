import { Router } from "express";
import { Addproduct, GetAllProducts } from "../Controllers/Products.controllers.js";

const productrouter = Router();

productrouter.post('/add-products',Addproduct)
productrouter.get('/get-all-products',GetAllProducts)

export default productrouter;