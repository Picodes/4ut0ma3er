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
  .createEdit({
    model: 'code-davinci-edit-001',
    input: code,
    instruction: instruction,
    temperature: 0,
  })
  .then(response => {
    let result = response?.data?.choices?.[0]?.text ?? '';
    clipboard.writeSync(result);
  });
