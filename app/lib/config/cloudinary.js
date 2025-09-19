import{v2 as cloudinary} from "cloudinary"
import detenv from "dotenv";
import { Cloud } from "lucide-react";
configDotenv.config();
 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
     secure: true,
});
export default cloudinary;
