import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    userID:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    doctorName: { type: String, required: true },
    specialization: { type: String },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: Date },
    gender: { type: String },

    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String,default: null },
    address: { type: String },
     stripeSessionId: { type: String }, // 
    metadata: { type: Object }, 

    status: { type: String, default: "Pending" }, // Pending / Confirmed / Cancelled
  },
  { timestamps: true }
);

const Appointment =
  mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);

export default Appointment;
