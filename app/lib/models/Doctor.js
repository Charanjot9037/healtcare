import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  degree: { type: String, required: true },
  fees: { type: Number, required: true },
  licenseNumber: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  specialization: { type: String, required: true },
  imageUrl: { type: String }, // store image URL or path
}, { timestamps: true });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

export default Doctor;
