class MessageUtils {
    static getUrl(message) {
        return `https://discordapp.com/channels/${message.guildID || "@me"}/${message.channel.id}/${message.id}`;
    }
}

module.exports = MessageUtils;