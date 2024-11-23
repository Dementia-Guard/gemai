import yup from 'yup'

class GemAIYup {
    askAi = yup.object({
        prompt:yup.string().required(),
        uid:yup.string().required(),
    })
}

export default GemAIYup = new GemAIYup();