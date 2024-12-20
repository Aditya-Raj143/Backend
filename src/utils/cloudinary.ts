import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localfilepath: string) => {
  try {
    if (!localfilepath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
    });
    //file uploaded successfully
    fs.unlinkSync(localfilepath);
    return {
      ...response, duration: response.resource_type === "video" ? response.duration : undefined
    };
  } catch (error) {
    fs.unlinkSync(localfilepath); //removes locally saved temp file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
