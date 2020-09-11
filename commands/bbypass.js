const Requester = require('../utils/Requester');

module.exports = {
    name: "bbypass",
    description: "Allows you to message users you have blocked (not the other way).",
    usage: 'bbypass [userid] [message]',
    category: 'malicious',
    execute: async (client, args) => {
        if(args.length < 2)
            throw new Error("Invalid usage");

        try {
            let channel = await client.getDMChannel(args[0]);
            args.shift();

            await Requester.discordRequest(
                `/channels/${channel.id}/messages`,
                'POST',
                {content: args.join(' ')},
                client.config.token
            );

            client.logger.log("Message sent.");
        } catch (e) {
            client.logger.error(`Cannot get DMChannel of userId=${args[0]}`);
        }
    }
}