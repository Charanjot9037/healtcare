import dbConnect from "@/app/lib/config/db";
import Doctor from "@/app/lib/models/Doctor";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const {
        name,
        mobile,
        degree,
        fees,
        licenseNumber,
        gender,
        specialization,
        imageUrl,
      } = req.body;
      const newDoctor = new Doctor({
        name,
        mobile,
        degree,
        fees,
        licenseNumber,
        gender,
        specialization,
        imageUrl,
      });

      await newDoctor.save();

      res.status(201).json({ success: true, doctor: newDoctor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
