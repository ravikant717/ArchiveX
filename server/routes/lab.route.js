import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  convertIMGtoPDF,
  convertPPTXtoPDF,
  recognizePDF,
} from "../controllers/lab.controller.js";
import { upload } from "../utils/fileUpload.js";
const router = express.Router();

/**
 * TODO: Convert PPTX to PDF, IMG to PDF, Merge PDF {BETTER UI} with Organize pages.
 */

router.post(
  "/convert/pptx2pdf",
  protectRoute,
  upload.single("file"),
  convertPPTXtoPDF
);
router.post(
  "/convert/img2pdf",
  protectRoute,
  upload.array("files", 10),
  convertIMGtoPDF
);
router.post("/ocr", protectRoute, upload.single("file"), recognizePDF);
export default router;
