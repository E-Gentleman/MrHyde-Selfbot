# Mr. Hyde - Selfbot
I don't take any responsibility for Discord accounts that use this bot neither the use you make of its features.
## Introduction
**The bot is still WIP**
Mr. Hyde is a Discord selfbot bringing you some usefull features:
 - **Spy**: track all messages / updates from a list of users (desktop notifications support)
 - **MessageBin**: Store created/edited/deleted messages from users in spy list
 - **Notifier**: Get notified when a message contains certains words
 - **[WIP] Analytics**: store all presence activities and related players for your own analytics purposes
 - **[WIP] Infos**: get a guild infos and what you're allowed to perform on it
 - MongoDB storage
 - Easy commands and events implementation
 - Desktop notifications
 
 ![preview](https://s8.gifyu.com/images/previewd29705674e361f4a.gif)
 
## FAQ
**Selfbots are against Discord TOS, is Mr.Hyde  safe ?**
- Short answer: Yes, as long  as you don't tell another user and he decides to report you, your account is safe.
- Technical answer: Yes, Mr.Hyde uses the [Eris Selfbot](https://github.com/erupcja/eris) library which uses a real User-Agent for all requests

## How to use
- Install latest version of [NodeJS](https://nodejs.org/en/download/)
- Install [MongoDB Comunity Edition](https://www.mongodb.com/try/download/community?tck=docs_server)
- Clone this repository
- Open cloned folder in a terminal and type `npm i` to download dependencies
- Open the `config.json` file and add your Discord account token
- Start the bot with `npm start` and type `help` once ready, to get a list of commands
