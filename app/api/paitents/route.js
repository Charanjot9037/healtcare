
// import User from "@/app/lib/models/User";

// export async function GET() {
//   try {
//     await dbConnect();
//     const user = await User.find({});
//     return Response.json(user);
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }import dbConnect from "@/app/lib/config/db";
import User from "@/app/lib/models/User";
import dbConnect from "@/app/lib/config/db";
export async function GET() {
  try {
    await dbConnect();

        await dbConnect();
    const users = await User.find({ role: "user" });
    
    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
