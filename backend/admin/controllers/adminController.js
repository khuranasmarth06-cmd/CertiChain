import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getPendingInstitutes, approveInstitute, } from "../services/adminService.js";
import { getApprovedInstitutes } from "../services/adminService.js";
dotenv.config();
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid Credentials"
    });
  }
  const token = jwt.sign(
    {
      role: "admin"
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );
  res.status(200).json({
    message: "Admin Login Successful",
    token,
    admin: {
      email
    }
  });
};
export const fetchPendingInstitutes = async (req,res) => {
  try {
    const institutes =await getPendingInstitutes();
    res.status(200).json({
      success: true,
      institutes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const approveInstituteRequest = async (req,res) => {
  try {
    const { walletAddress } = req.body;
    const institute=await approveInstitute(walletAddress);
    res.status(200).json({
      success: true,
      message:
        "Institute approved successfully.",
      institute,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const fetchApprovedInstitutes = async (req,res
) => {
  try {
    const institutes =await getApprovedInstitutes();
    res.status(200).json({
      success: true,
      institutes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};