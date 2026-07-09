import mongoose from "mongoose";
const instituteSchema = new mongoose.Schema(
  {
    instituteName: {
      type: String,
      required: true,
      trim: true,
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Institute = mongoose.model(
  "Institute",
  instituteSchema
);
export default Institute;