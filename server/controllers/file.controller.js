import cloudinary from "../config/cloudinary.js";
import axios from "axios";
import path from "path";
import streamifier from "streamifier";
import { File } from "../models/file.model.js";

/**
 * POST /upload
 */
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Wrap upload_stream in a Promise to properly handle async errors
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: `drive/${req.user._id}`,
          use_filename: true,
          unique_filename: false,
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary error:", error);
            return reject(new Error("Cloudinary upload failed"));
          }

          try {
            // Attempt to save file metadata to database
            const file = await File.create({
              userId: req.user._id,
              filename: req.file.originalname,
              url: result.secure_url,
              publicId: result.public_id,
            });

            resolve(file);
          } catch (dbError) {
            console.error("Database error:", dbError);
            // Clean up the Cloudinary upload if DB write fails
            try {
              await cloudinary.uploader.destroy(result.public_id, {
                resource_type: "raw",
              });
              console.log("Cleaned up orphaned Cloudinary file:", result.public_id);
            } catch (cleanupError) {
              console.error("Failed to clean up Cloudinary file:", cleanupError);
            }
            reject(new Error("Database error while saving file"));
          }
        },
      );

      // Pipe the file buffer to the upload stream
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Await the upload and database save
    const file = await uploadPromise;

    return res.status(201).json({
      success: true,
      file,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /my-files
 */
export const getFilesForUser = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id }).sort({
      uploadedAt: -1,
    });

    return res.status(200).json({
      success: true,
      files,
    });
  } catch (err) {
    console.error("getFilesForUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const downloadFile = async (req, res) => {
  try {
    const { _id } = req.params;

    const file = await File.findById(_id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // ownership check
    if (file.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const upstream = await axios.get(file.url, { responseType: "stream" });
    const safeName = (file.filename || "download")
      .replace(/"/g, "")
      .replace(/[^A-Za-z0-9._-]/g, "_");

    res.setHeader("Content-Disposition", `attachment; filename="${safeName}"`);
    if (upstream.headers["content-type"]) {
      res.setHeader("Content-Type", upstream.headers["content-type"]);
    }
    if (upstream.headers["content-length"]) {
      res.setHeader("Content-Length", upstream.headers["content-length"]);
    }

    upstream.data.on("error", (streamErr) => {
      console.error("Download stream error:", streamErr);
      res.end();
    });

    return upstream.data.pipe(res);
  } catch (err) {
    console.error("downloadFile error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const renameFile = async (req, res) => {
  try {
    const { _id } = req.params;
    const { newFilename } = req.body;
    if (!newFilename || !newFilename.trim()) {
      return res.status(400).json({ message: "New filename is required" });
    }
    const file = await File.findById(_id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    // ownership check
    if (file.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const originalExt = path.extname(file.filename || "");
    const trimmedName = newFilename.trim();
    const baseName = trimmedName.replace(/\.[^/.]+$/, "");
    file.filename = originalExt ? `${baseName}${originalExt}` : trimmedName;
    await file.save();
    return res.status(200).json({ success: true, file });
  } catch (err) {
    console.error("Rename error: ", err);
    return res.status(500).json({ message: "Server error" });
  }
};
