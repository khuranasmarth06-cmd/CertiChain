import express from "express";
import {fetchPendingInstitutes,approveInstituteRequest,fetchApprovedInstitutes,loginAdmin,rejectInstitute,} from "../controllers/adminController.js";
const router = express.Router();
router.post("/login", loginAdmin);
router.patch("/approve-institute", approveInstituteRequest);
router.patch("/reject-institute", rejectInstitute);
router.get("/pending-institutes", fetchPendingInstitutes);
router.get("/approved-institutes", fetchApprovedInstitutes);
export default router;