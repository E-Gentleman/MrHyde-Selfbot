module.exports = async (client, message) => {
    if(client.config.debug)
        client.logger.debug(message);
}