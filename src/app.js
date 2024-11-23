import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import corsOption from "./Config/Cors/CorsConfig.js";
import response from "./Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "./Utils/Constants/ResTypes.js";
import GemAIRoute from "./Routes/GemAIRoute.js"
import GemAIKeyValidator from "./MiddleWare/GemAIKey/GemAIKeyValidator.js";
import { envConfig } from "./Config/Env/EnvConfig.js";

dotenv.config()
const app = express()

const PORT = envConfig.port

app.use(cors(corsOption))
app.use(express.json())

app.get('/', (req, res) => {
    return response(res,true, 200, ResTypes.successMessages.server_online)
})

//routes init
app.use('/gemai',GemAIKeyValidator,GemAIRoute)

app.use((req, res) => {
    return response(res, false,404, ResTypes.errors.not_found)
})

app.listen(PORT, () => {
    console.log(`GemAi Server is listening on ${PORT}`);
})