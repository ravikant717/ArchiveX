import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt-archivex", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, //Only accessible by web server, prevent XSS attacks
    sameSite: "strict", //CSRF protection
    secure: ENV_VARS.NODE_ENV !== "development", //Only sent over HTTPS
  });
  return token;
};
