import express from "express";
import { uploadFile } from "../controllers/file.controller.js";
import { upload } from "../utils/fileUpload.js";
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;
