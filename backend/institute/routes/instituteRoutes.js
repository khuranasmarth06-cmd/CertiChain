import express from "express";
import {signupInstitute,loginInstitute,} from "../controllers/instituteController.js";
const router = express.Router();
router.post("/signup", signupInstitute);
router.post("/login", loginInstitute);
export default router;