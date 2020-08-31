const Message = require('../models/Message');
const Spied = require('../models/Spied');

module.exports = async (client, message) => {
    if(!message.author)
        return;

    let spied = await Spied.findOne({userId: message.author.id});

    if(spied) {
        await new Message({
            previousContent: message.content,
            when: Date.now(),
            event: "delete",
            channelId: message.channel.id,
            userId: message.author.id,
            username: message.author.username
        }).save();

        client.logger.log(`Stored deleted message from ${message.author.username}`);
    }
}