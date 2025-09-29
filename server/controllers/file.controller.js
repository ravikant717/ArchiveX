import cloudinary from "../config/cloudinary.js";
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error)
          return res
            .status(500)
            .json({ message: "Cloudinary upload error", error });
        return res.status(200).json({
          message: "File uploaded successfully",
          url: result.secure_url,
        });
      }
    );
    result.end(req.file.buffer);
  } catch (err) {
    console.error("Error in file upload controller: " + err.message);
    return res.status(500).json({ message: "Server error", error: err });
  }
};
