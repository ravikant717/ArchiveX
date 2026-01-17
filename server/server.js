import express from "express";
import authRoutes from "./routes/auth.route.js";
import fileRoutes from "./routes/file.route.js";
import labRoutes from "./routes/lab.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = ENV_VARS.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/file", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
