import express from "express";
import { login } from "../controllers/auth.js";

// allow express to identify routes are all configured and allows to have in separate files 
const router = express.Router();

router.post("/login", login);

export default router;
