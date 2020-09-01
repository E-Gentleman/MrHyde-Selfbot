class MessageUtils {
    constructor(client) {
        this.client = client;
    }

    getUrl(message) {
        return `https://discordapp.com/channels/${message.guildID || "@me"}/${message.channel.id}/${message.id}`;
    }

    mentionsSelf(message) {
        return !message.author.bot && (message.mentionEveryone || message.mentions.filter(u => u.id === this.client.user.id).length > 0);
    }

    mentionsTags(message) {
        for(const tag of this.client.config.modules.notifier.tagWords) {
            if(message.content.includes(tag))
                return true;
        }

        return false;
    }
}

module.exports = MessageUtils;