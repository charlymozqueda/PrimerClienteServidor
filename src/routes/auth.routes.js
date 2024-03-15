import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken
} from "../controllers/auth.controllers.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.get("/logout", logout);
  
export default router;