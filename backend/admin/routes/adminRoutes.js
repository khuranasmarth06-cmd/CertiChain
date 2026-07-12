import express from "express";
import {fetchPendingInstitutes,approveInstituteRequest,} from "../controllers/adminController.js";
import { loginAdmin } from "../controllers/adminController.js";
const router = express.Router();
router.post("/login", loginAdmin);
router.patch("/approve-institute",approveInstituteRequest);
router.get("/pending-institutes",fetchPendingInstitutes);
router.patch("/approve-institute",approveInstituteRequest);
export default router;