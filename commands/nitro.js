const consoleTable = require('console.table');

module.exports = {
    name: "nitro",
    description: "Log a fake random nitro gift URL or send it to a target user",
    usage: 'nitro {targetUserId}',
    category: 'malicious',
    execute: async (client, args) => {
        let charset = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz1234567890",
            code = "",
            url = "";

        for(let i = 0; i < 16; i++) {
            code += charset[Math.floor(Math.random() * charset.length)];
        }

        url = `https://discord.gift/${code}`;

        if(args[0]) {
            try {
                let channel = await client.getDMChannel(args[0]);
                await client.createMessage(channel.id, url);

                return client.logger.log("Sent fake nitro gift URL");
            } catch (e) {
                return client.logger.error("This user doesn't exist or is not allowing private messages.");
            }
        }

        client.logger.log(`Fake nitro URL: ${url}`);
    }
}