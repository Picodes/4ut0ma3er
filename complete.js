const dotenv = require('dotenv');
const clipboard = require('clipboardy');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

dotenv.config({ path: path.join(__dirname, './.env') });

const [_, __, instruction, code] = process.argv;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

openai
  .createCompletion({
    model: 'code-davinci-002',
    prompt: `${code}\n\n//Tests for the previous function`,
    temperature: 0.1,
  })
  .then(response => {
    let result = response?.data?.choices?.[0]?.text ?? '';
    console.log(result);
    clipboard.writeSync(result);
  });
