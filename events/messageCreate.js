const Spied = require('../models/Spied');
const Message = require('../models/Message');
const {PrivateChannel} = require('@erupcja/selfbot-eris');

module.exports = async (client, message) => {
    if(message.channel instanceof PrivateChannel) {
        if(client.config.modules.dnd.enabled && message.author.id !== client.user.id && !message.author.bot) {
            client.createMessage(message.channel.id, client.config.modules.dnd.message);
            client.notifier.notify(`[DM] ${message.author.username}`, message.content, client.utils.message.getUrl(message));
        }

        return;
    }

    let spied = await Spied.findOne({userId: message.author.id});

    if(spied || client.utils.message.mentionsSelf(message) || client.utils.message.mentionsTags(message)) {
        await new Message({
            previousContent: message.content,
            when: Date.now(),
            event: "create",
            channelId: message.channel.id,
            userId: message.author.id,
            username: message.author.username
        }).save();

        client.logger.log(`Stored new message from ${message.author.username}`);
        return client.notifier.notify(message.author.username, message.content, client.utils.message.getUrl(message));
    }
}