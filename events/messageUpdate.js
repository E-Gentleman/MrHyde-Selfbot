const Message = require('../models/Message');
const Spied = require('../models/Spied');

module.exports = async (client, message, oldMessage) => {
    if(!oldMessage)
        return;

    let spied = await Spied.findOne({userId: message.author.id});

    if(spied || client.utils.message.mentionsSelf(message) || client.utils.message.mentionsTags(message)) {
        await new Message({
            previousContent: oldMessage.content,
            when: Date.now(),
            event: "update",
            channelId: message.channel.id,
            userId: message.author.id,
            username: message.author.username
        }).save();

        client.logger.log(`Stored before edition message from ${message.author.username}`);
    }
}