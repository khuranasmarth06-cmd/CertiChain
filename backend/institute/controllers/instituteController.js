import bcrypt from "bcrypt";
import Institute from "../models/Institute.js";
import generateToken from "../../utils/generateToken.js";
export const signupInstitute = async (req, res) => {
  try {
    const {instituteName,walletAddress,password,} = req.body;
    if (!instituteName||!walletAddress ||!password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingInstitute=await Institute.findOne({walletAddress:
          walletAddress.toLowerCase(),
      });
    if (existingInstitute) {
      return res.status(400).json({
        message: "Institute already exists",
      });
    }
    const hashedPassword =await bcrypt.hash(password, 10);
    const institute =
      await Institute.create({
        instituteName,
        walletAddress:
          walletAddress.toLowerCase(),
        password: hashedPassword,
      });
    res.status(201).json({
      message:"Institute registered successfully",
      token:generateToken(institute._id),
      institute: {
        id: institute._id,
        instituteName:institute.instituteName,
        walletAddress:institute.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loginInstitute = async (req, res) => {
  try {
    const {
      walletAddress,
      password,
    } = req.body;
    if (!walletAddress || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const institute =await Institute.findOne({
        walletAddress:walletAddress.toLowerCase(),
      });
    if (!institute) {
      return res.status(401).json({
        message: "Invalid wallet or password",
      });
    }
    const isMatch =
      await bcrypt.compare(
        password,
        institute.password
      );
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid wallet or password",
      });
    }
    res.status(200).json({
      message:"Login successful",
      token:generateToken(institute._id),
      institute: {
        id: institute._id,
        instituteName:institute.instituteName,
        walletAddress:institute.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};