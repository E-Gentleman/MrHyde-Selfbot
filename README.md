# Mr. Hyde - Selfbot
Everything you can see here has been made for educational purposes and proof of concepts. I do not promote the usage of this tools and I do not take responsability on the bad usage of this tools neither for the Discord accounts that used it.

## Summary
[Introduction](https://github.com/E-Gentleman/MrHyde-Selfbot#introduction)  
[Commands](https://github.com/E-Gentleman/MrHyde-Selfbot#commands)  
[How to install](https://github.com/E-Gentleman/MrHyde-Selfbot#how-to-install)  
[FAQ](https://github.com/E-Gentleman/MrHyde-Selfbot#faq)


## Introduction
Mr. Hyde is a Discord selfbot (bot running on your user account) bringing you some usefull features:
 - MongoDB storage
 - Desktop notifications
 - Logging
 - Member spying & analytics
 - Usefull commands (see the [complete list](https://github.com/E-Gentleman/MrHyde-Selfbot/tree/master/commands))
 - Many more to come
 
 ![preview](https://s8.gifyu.com/images/previewd29705674e361f4a.gif)
 
## How to install
- Install latest version of [NodeJS](https://nodejs.org/en/download/)
- Install [MongoDB Comunity Edition](https://www.mongodb.com/try/download/community?tck=docs_server) and create a database named `mrhyde`
- [Download](https://github.com/E-Gentleman/MrHyde-Selfbot/archive/master.zip) Mr.Hyde source code zip and extract it
- Open extracted folder in a terminal and type `npm i` to download dependencies
- Copy content of `config-example.json` to a new `config.json` file and add your Discord account token
- Start the bot with `npm start` and type `help` once ready, to get a list of commands

## FAQ
**Selfbots are against Discord TOS, is Mr.Hyde  safe ?**
- Short answer: Yes, as long as you don't tell/show another user and he decides to report you, your account is safe.
- Technical answer: Yes, Mr.Hyde uses the [Eris Selfbot](https://github.com/erupcja/eris) library which uses a real User-Agent for all requests and only respond to CLI commands.