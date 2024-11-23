import { envConfig } from "../../Config/Env/EnvConfig.js";
import response from "../../Utils/ResponseHandler/ResponseHandler.js";

const GemAIKeyValidator = (req, res, next) => {
    const clientApiKey = req.headers["x-api-key"];

    if (!clientApiKey) {
        return response(res,false,404,{message: "API key is missing"})
    }

    if (clientApiKey !== envConfig.gemai_server_api_key) {
        return response(res,false,403,{message: "Invalid API key"})
    }

    next();
};

export default GemAIKeyValidator;