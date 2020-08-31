const Spied = require('../models/Spied');
const MessageUtils = require('../utils/MessageUtils');
const Message = require('../models/Message');

module.exports = async (client, message) => {
    let spied = await Spied.findOne({userId: message.author.id});

    if(spied) {
        await new Message({
            previousContent: message.content,
            when: Date.now(),
            event: "create",
            channelId: message.channel.id,
            userId: message.author.id,
            username: message.author.username
        }).save();

        client.logger.log(`Stored new message from ${message.author.username}`);
        return client.notifier.notify(message.author.username, message.content, MessageUtils.getUrl(message));
    }

    for(const tag of client.config.modules.notifier.tagWords) {
        if(message.content.includes(tag))
            return client.notifier.notify(message.author.username, message.content, MessageUtils.getUrl(message));
    }
}