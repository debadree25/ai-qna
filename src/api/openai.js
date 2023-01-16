import { Configuration, OpenAIApi } from 'openai';
import config from '../config';
import RESPONSES from '../constants/responses';

const configuration = new Configuration({
  apiKey: config.openAiApiKey,
});
const openai = new OpenAIApi(configuration);

export default async function openAI(prompt, isDefault = false) {
  try {
    const apiConfig = {
      model: config.modelName,
      prompt,
      temperature: 0.8,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    const resp = await openai.createCompletion(apiConfig);
    const response = resp.data.choices[0].text;

    if (isDefault) {
      if (response?.match(/yes/i)) {
        return {
          prompt: `${prompt}${response}\n`,
          ai: RESPONSES.READY_RESPONSE,
        };
      }
      return {
        prompt: `${prompt}${response}\n`,
        ai: RESPONSES.ERROR_RESPONSE,
      };
    }

    return {
      prompt: `${prompt}${response}\n`,
      ai: response,
    };
  } catch (err) {
    console.log(err);
    return {
      prompt: `${prompt}\n`,
      ai: RESPONSES.ERROR_RESPONSE,
    };
  }
}
