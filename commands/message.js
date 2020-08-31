const consoleTable = require('console.table');
const Message =  require('../models/Message');

module.exports = {
    name: "message",
    description: "Displays deleted/updated messages for a (previously) spied user",
    usage: 'message [userId]',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        let messages = await Message.find({userId: args[0]})
            .sort({when: 'desc'});

        if(messages.length === 0)
            return client.logger.log("No results found");

        console.table(messages.map(m => {
            let o = m.toObject();
            return {
                event: o.event,
                previousContent: o.previousContent,
                channelId: o.channelId,
                userId: o.userId,
                when: o.when,
                username: o.username
            }
        }));
    }
}