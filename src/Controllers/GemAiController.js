import response from "../Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "../Utils/Constants/ResTypes.js";
import { envConfig } from "../Config/Env/EnvConfig.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// In-memory store for conversation histories
const userHistories = {};

class GemAiController {
    constructor() {
        this.api_key = envConfig.gemini_api_key
    }
    // Test API
    test = async (req, res) => {
        return response(res, true, 200, ResTypes.successMessages.server_online);
    }
    getPrompt = async (req, res) => {
        const { prompt, uid } = req.body;
        try {
            // Initialize GoogleGenerativeAI with the API key
            const genAI = new GoogleGenerativeAI(this.api_key);

            // Load the generative model
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            // Initialize or retrieve the user's history
            if (!userHistories[uid]) {
                userHistories[uid] = []; // Start with an empty history
            }

            // Start a chat with the user's history
            const chat = model.startChat({ history: userHistories[uid] });

            // Send the user's prompt as a message
            let result = await chat.sendMessage(prompt);

            // Get the response text from the model
            const responseText = result.response.text();

            // Send the response
            return response(res, true, 200, {
                response: responseText,
                chatHistory: userHistories[uid],
            });
        } catch (error) {
            console.log(error);
            return response(res, false, 500, { message: error.message });
        }
    }
}

export default new GemAiController()