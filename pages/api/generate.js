//import { Configuration, OpenAIApi } from 'openai';
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

  const generateAction = async (req, res) => {
    try {
      // Run first prompt
      const key  = "3f377b9958a74ffa85fcae4b72fed525";
      const endpoint = "https://openaiapi.openai.azure.com/";
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));
      const deploymentId = "gpt";
      const deploymentName = "text-davinci-003";

      const basePromptPrefix = "you are writing thank you notes to close friends and family.";
      const examplePrompts = [
        "Write kind thank you letters to your friends and family.",
        "Write a thank you letter to a family member who attended your wedding.",
        "Only return the content of the thank you letter, nothing in response to the prompt."
      ];  
      console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

      const baseCompletion = await client.getCompletions(deploymentId, examplePrompts, {
        maxTokens: 25,
        temperature: 0.7,
      });
      console.log(`----------------------`);
      console.log(baseCompletion);

      const basePromptOutput = baseCompletion.choices[0].text;
      console.log(basePromptOutput);

      res.status(200).json({ basePromptOutput });
      console.log(res.status(200).json({ basePromptOutput }));

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating the completion.' });
    };
};

export default generateAction;