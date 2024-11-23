// config/config.js
import dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
    port: process.env.GEMAI_SERVER_PORT || 8257,
    gemini_api_key: process.env.GEMINI_API_KEY,
    gemai_server_api_key: process.env.GEMAI_SERVER_API_KEY,
};