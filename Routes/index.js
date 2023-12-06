import { Router } from "express";
import productrouter from "./Products.route.js";
import authrouter from "./Auth.routes.js";

const router = Router();

router.use('/products',productrouter)
router.use('/auth',authrouter)

export default router;