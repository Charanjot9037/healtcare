import dbConnect from "@/app/lib/config/db";
import Doctor from "@/app/lib/models/Doctor";

export async function GET() {
  try {
    await dbConnect();
    const doctors = await Doctor.find({});
    return Response.json(doctors);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}