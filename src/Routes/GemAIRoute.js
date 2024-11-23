import Express from "express";
const router = Express.Router()
import validateScehma from "../MiddleWare/Schema/ValidateScehma.js";
import GemAIYup from "../Utils/Validation/GemAIYup.js";
import GemAiController from "../Controllers/GemAiController.js";

router.get("/",GemAiController.test)
router.post("/askai", validateScehma(GemAIYup.askAi) ,GemAiController.getPrompt)

export default router