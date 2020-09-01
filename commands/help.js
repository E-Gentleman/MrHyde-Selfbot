const consoleTable = require('console.table');

module.exports = {
    name: "help",
    description: "Displays a list of commands",
    usage: 'help {category}',
    category: 'utilities',
    execute: async (client, args) => {
        let commands = Array.from(client.commands);

        if(args[0])
            commands = commands.filter(c => c[1].category.toLowerCase() === args[0].toLowerCase());

        client.logger.log(`Available ${args[0] ? args[0] + " " : ""}commands:\n\n[] = required, {} = optional\n`);
        console.table(commands.map(c => {
            c = c[1];

            return {
                name: c.name,
                usage: c.usage,
                description: c.description,
                category: c.category
            }
        }));
    }
}