const Friend = require('../models/Friend');

module.exports = {
    name: "backup",
    description: "Saves your friends to the DB",
    usage: 'backup',
    category: 'utilities',
    execute: async (client, args) => {
        client.logger.log(`Saving ${client.relationships.size} friends to the DB...`);

        for(const relation of client.relationships) {
            let user = relation[1].user;

            await Friend.findOneAndUpdate({
                id: user.id
            }, {
                username: user.username,
                discriminator: user.discriminator,
                tag: `${user.username}#${user.discriminator}`
            }, {upsert: true, new: true});
        }

        client.logger.log("Done.");
    }
}