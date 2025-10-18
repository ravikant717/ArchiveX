import express from "express";
import {
  downloadFile,
  getFilesForUser,
  renameFile,
  uploadFile,
} from "../controllers/file.controller.js";
import { upload } from "../utils/fileUpload.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/upload", protectRoute, upload.single("file"), uploadFile);
router.get("/my-files", protectRoute, getFilesForUser);
router.get("/download/:_id", protectRoute, downloadFile);
router.post("/rename/:_id", protectRoute, renameFile);
export default router;
