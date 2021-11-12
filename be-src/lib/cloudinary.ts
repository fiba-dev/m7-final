import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL);
export { cloudinary };
