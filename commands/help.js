const consoleTable = require('console.table');

module.exports = {
    name: "help",
    description: "Displays a list of commands",
    usage: 'help',
    execute: async (client, args) => {
        client.logger.log("Available commands:\n\n[] = required, {} = optional\n");

        console.table(Array.from(client.commands).map(c => {
            c = c[1];

            return {
                name: c.name,
                usage: c.usage,
                description: c.description
            }
        }));
    }
}