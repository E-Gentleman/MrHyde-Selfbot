const Friend = require('../models/Friend');
const Requester = require('../utils/Requester');

module.exports = {
    name: "restore",
    description: "Restore saved friends from the db",
    usage: 'restore',
    category: 'utilities',
    execute: async (client, args) => {
        let friends = await Friend.find();

        if(friends.length === 0)
            return client.logger.log("You have no saved friends.");

        client.logger.log(`Restoring ${friends.length} friends...`);

        for(const friend of friends.map(f => f.toObject())) {
            await Requester.discordRequest(
                `/users/@me/relationships`,
                'POST',
                {
                    discriminator: friend.discriminator,
                    username: friend.username
                },
                client.config.token
            )
        }

        client.logger.log("Done.");
    }
}