import { exec } from "child_process";
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const __filename = fileURLToPath(import.meta.url);

/**
 *
 * TODO: Add comments for each function
 */

export const convertPPTXtoPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const tempDir = os.tmpdir();
    const inputPath = path.join(tempDir, `${Date.now()}_input.pptx`);

    const outputDir = tempDir;
    const inputBaseName = path.basename(inputPath, ".pptx");
    const outputPath = path.join(outputDir, inputBaseName + ".pdf");

    await fs.promises.writeFile(inputPath, req.file.buffer);
    const libreOfficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

    const command = `${libreOfficePath} --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;

    exec(command, async (error) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return res.status(500).json({ message: "Error converting file" });
      }
      if (!fs.existsSync(outputPath)) {
        console.error("Output file not found after conversion");
        return res.status(500).json({ message: "Conversion failed" });
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="converted.pdf"'
      );
      const pdfStream = fs.createReadStream(outputPath);
      pdfStream.pipe(res);
      pdfStream.on("end", () => {
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    });
  } catch (error) {
    console.error("Error converting PPTX to PDF:", error);
    return res.status(500).json({ message: "Error converting file" });
  }
};

export const convertIMGtoPDF = async (req, res) => {
  try {
    /***
     * ISSUE: It will fail if upload.single() used in route, use upload.array() instead*
     ***/
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const pdfDoc = await PDFDocument.create();
    const A4_WIDTH = 595.28;
    const A4_HEIGHT = 841.89;

    for (const file of req.files) {
      let img;
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        img = await pdfDoc.embedJpg(file.buffer);
      } else if (file.mimetype === "image/png") {
        img = await pdfDoc.embedPng(file.buffer);
      } else {
        continue;
      }

      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

      const scale = Math.min(A4_WIDTH / img.width, A4_HEIGHT / img.height);
      const width = img.width * scale;
      const height = img.height * scale;

      page.drawImage(img, {
        x: (A4_WIDTH - width) / 2,
        y: (A4_HEIGHT - height) / 2,
        width,
        height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="converted.pdf"'
    );
    res.end(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error converting images to PDF:", error);
    return res.status(500).json({ message: "Error converting file" });
  }
};

export const recognizePDF = () => {};
