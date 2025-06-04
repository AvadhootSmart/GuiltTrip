const dotenv = require("dotenv");
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const STEAM_API_KEY = process.env.STEAM_API_KEY;
export const FRONTEND_URL = process.env.FRONTEND_URL;

