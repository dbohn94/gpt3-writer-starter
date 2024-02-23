import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  //basePath: 'https://openaiapi.openai.azure.com/openai/deployments/gpt?api-version=2023-03-15-preview',
  //POST https://{your-resource-name}.openai.azure.com/openai/deployments/{deployment-id}/completions?api-version={api-version}
  //https://openaiapi.openai.azure.com/openai/deployments/gpt/completions?api-version=2023-03-15-preview&api-key=3f377b9958a74ffa85fcae4b72fed525
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "you are writing thank you notes to close friends and family.";

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'gpt-3.5-turbo',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;