import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    contact: { type: String },
    location: { type: String },
    age: { type: Number },
    gender: { type: String, enum: ["male", "female", "other"] },
    disease: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
