const fs = require('fs');
const Eris = require('@erupcja/selfbot-eris');
const Database = require('./classes/database');
const config = require('./config.json');

const client = new Eris(config.token);

(async () => {
    client.config = config;
    client.logger = require('./classes/Logger');

    client.logger.info("*Waking up*");

    client.logger.debug("Initializing modules...");
    client.notifier = require('./classes/notifier');
    client.logger.debug("Notifier initialized.");

    await new Database(client).connect();

    let events = fs.readdirSync('./events');
    client.logger.info(`Loading ${events.length} event(s)...`);

    events.forEach(file => {
        let event = require(`./events/${file}`),
            eName = file.split('.')[0];

        client.on(eName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];

        client.logger.log(`Loaded "${eName}" event.`);
    });

    client.commands = new Map();
    let commands = fs.readdirSync('./commands');
    client.logger.info(`Loading ${commands.length} command(s)...`);

    commands.forEach(file => {
        let command = require(`./commands/${file}`);

        client.commands.set(command.name, command);
        delete require.cache[require.resolve(`./commands/${file}`)];

        client.logger.log(`Loaded "${command.name}" command.`);
    });

    client.logger.info("Logging in...");
    client.connect();
})();
