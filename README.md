# GPT-3 4ut0ma3er

Automate queries to GPT3 in your VSCode workflow.

## Prerequisite

In order to use this repo, you will need to have yarn and node.js installed on your computer.

You can install yarn by following the instructions on the Yarn website: https://yarnpkg.com/getting-started/install

You can install node.js by following the instructions on the Node.js website: https://nodejs.org/en/download/

## Installation

1. Clone this code repository to your local machine
2. Open a terminal or command prompt and navigate to the root directory of the repo
3. Run the command `yarn install` to install all necessary dependencies
4. Create a `.env` file and fill it with your OpenAI API key (obtain it [here](https://beta.openai.com/account/api-keys))
5. Complete the `tasks.json` file with the path to this repository
6. Paste the `tasks.json` in your VSCode User Tasks config file, which you can open using VSCode command `Tasks: Open User Tasks`

You're all set! Try it by selecting some test and running VSCode command `Tasks: Run Task`. You'll eventually need to reload VSCode or restart it.

As an additional step you can setup keybord shortcuts using VSCode command `Preferences: Open Keyboard Shortcuts`

## Contributing

To contribute to this repo, please follow these steps:

1. Fork this repo
2. Create a new branch for your changes
3. Make your changes and commit them to your branch
4. Push your branch to your forked repo
5. Submit a pull request to this repo's `main` branch

## License

This repo is licensed under the GNU GENERAL PUBLIC LICENSE license. Please see the [LICENSE](LICENSE.md) file for more details.
