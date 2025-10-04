import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("jwt-archivex", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, //Only accessible by web server, prevent XSS attacks
    // During development the frontend and backend run on different ports (different origins).
    // Use 'lax' in development so the browser will send the cookie on top-level navigations and GET requests.
    // In production keep 'strict' for tighter CSRF protection unless your deploy requires otherwise.
    sameSite: ENV_VARS.NODE_ENV === "development" ? "lax" : "strict",
    secure: ENV_VARS.NODE_ENV !== "development", //Only sent over HTTPS in production
  });
  return token;
};
