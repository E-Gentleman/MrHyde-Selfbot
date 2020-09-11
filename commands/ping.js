const Requester = require('../utils/Requester');

module.exports = {
    name: "ping",
    description: "Get current latency between Mr.Hyde and Discord",
    usage: 'ping',
    category: 'utilities',
    execute: async (client, args) => {
        const shard = client.shards.get(0);
        client.logger.log(`Ping: ${shard.latency} ms`);
    }
}