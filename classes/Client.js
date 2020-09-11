const Eris = require('@erupcja/selfbot-eris');
const fs = require('fs');
const Requester = require('../utils/Requester');

const Config = require('./Config');
const Logger = require('./Logger');
const Notifier = require('./Notifier');
const MessageUtils = require('../utils/MessageUtils');
const Database = require('./Database');

class Client {
    constructor() {
        let config = new Config();

        this._client = new Eris(config.token);
        this._client.config = config;
        this._client.logger = Logger;
        this._client.notifier = Notifier;
        this._client.commands = new Map();
    }

    async bootstrap() {
        this._client.logger.info("*Waking up*");

        this.loadUtils();
        this.loadCommands();
        this.loadEvents();

        await new Database(this._client).connect();
        await this.checkVersion();

        this._client.logger.info("Logging in...");
        this._client.connect().catch(console.error);
    }

    async checkVersion() {
        this._client.logger.log("Checking for updates...");
        const current = require('../version.json').version;

        try {
            const latest = await Requester.request(
                "https://raw.githubusercontent.com/E-Gentleman/MrHyde-Selfbot/master/version.json",
                'GET'
            );

            if(current < latest.version)
                return this._client.logger.info(`A new Mr.Hyde version (v${latest.version}) is available at https://github.com/E-Gentleman/MrHyde-Selfbot`);

            this._client.logger.log("Already up to date.");
        } catch (e) {}
    }

    loadUtils() {
        this._client.utils = {
            message: new MessageUtils(this._client)
        }
    }

    loadCommands() {
        let commands = fs.readdirSync('./commands');
        this._client.logger.info(`Loading ${commands.length} command(s)...`);

        commands.forEach(file => {
            let command = require(`../commands/${file}`);

            this._client.commands.set(command.name, command);
            delete require.cache[require.resolve(`../commands/${file}`)];

            this._client.logger.log(`Loaded "${command.name}" command.`);
        });
    }

    loadEvents() {
        let events = fs.readdirSync('./events');
        this._client.logger.info(`Loading ${events.length} event(s)...`);

        events.forEach(file => {
            let event = require(`../events/${file}`),
                eName = file.split('.')[0];

            this._client.on(eName, event.bind(null, this._client));
            delete require.cache[require.resolve(`../events/${file}`)];

            this._client.logger.log(`Loaded "${eName}" event.`);
        });
    }
}

module.exports = Client;