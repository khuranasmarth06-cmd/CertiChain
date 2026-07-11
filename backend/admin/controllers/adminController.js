import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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