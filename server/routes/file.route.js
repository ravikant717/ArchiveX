import express from "express";
import { getFilesForUser, uploadFile } from "../controllers/file.controller.js";
import { upload } from "../utils/fileUpload.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/upload", protectRoute, upload.single("file"), uploadFile);
router.get("/files", protectRoute, getFilesForUser);
export default router;
