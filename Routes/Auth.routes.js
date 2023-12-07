import { Router } from "express";
import { getCurrentUser, login, register } from "../Controllers/Auth.controller.js";

const authrouter = Router();

authrouter.post("/register",register)
authrouter.post("/login",login)
authrouter.post("/get-current-user",getCurrentUser)

export default authrouter