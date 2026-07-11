import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./student/routes/studentRoutes.js";
import instituteRoutes from "./institute/routes/instituteRoutes.js";
import adminRoutes from "./admin/routes/adminRoutes.js";
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/student", studentRoutes);
app.use("/api/institute",instituteRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("CertiChain Backend Running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});