import cloudinary from "../config/cloudinary.js";
import { File } from "../models/file.model.js";
import streamifier from "streamifier";
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const originalName = req.file.originalname;
    //Unique Name for cloudinary origin
    const baseName = originalName
      .replace(/\.[^/.]+$/, "")
      .replace(/\s+/g, "_")
      .replace(/[^\w-]/g, "");
    const publicId = `${Date.now()}_${baseName}`;
    const cloudinaryUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", public_id: publicId },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };
    const result = await cloudinaryUpload(req.file.buffer);
    const newFile = new File({
      userId: req.user._id,
      filename: originalName,
      uploadedAt: Date.now(),
      url: result.secure_url,
      publicId: result.public_id,
    });
    await newFile.save();
    return res
      .status(200)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (err) {
    console.error("Error in file upload controller: " + err.message);
    return res.status(500).json({ message: "Server error", error: err });
  }
};

export const getFilesForUser = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id })
      .sort({
        uploadedAt: -1,
      })
      .lean();
    return res.status(200).json({ files });
  } catch (err) {
    console.error("Error in getFilesForUser controller: " + err.message);
    return res.status(500).json({ message: "Server error", error: err });
  }
};
