import bcrypt from "bcrypt";
import Student from "../models/student.js";
import generateToken from "../../utils/generateToken.js";
export const signupStudent = async (req, res) => {
  try {
    const {name,walletAddress,password,} = req.body;
    if (!name || !walletAddress || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const existingStudent = await Student.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
    const student = await Student.create({
      name,
      walletAddress: walletAddress.toLowerCase(),
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Student registered successfully",
      token: generateToken(student._id),
      student: {
        id: student._id,
        name: student.name,
        walletAddress: student.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loginStudent = async (req, res) => {
  try {
    const {walletAddress,password,} = req.body;
    if (!walletAddress || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const student = await Student.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });
    if (!student) {
      return res.status(401).json({
        message: "Invalid wallet or password",
      });
    }
    const isMatch = await bcrypt.compare(
      password,
      student.password
    );
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid wallet or password",
      });
    }
    res.status(200).json({
      message: "Login successful",
      token: generateToken(student._id),
      student: {
        id: student._id,
        name: student.name,
        walletAddress: student.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};