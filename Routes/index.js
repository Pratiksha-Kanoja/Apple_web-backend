import { Router } from "express";
import productrouter from "./Products.route.js";

const router = Router();

router.use('/products',productrouter)

export default router;