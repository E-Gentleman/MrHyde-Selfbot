const Spied = require('../models/Spied');

module.exports = {
    name: "spy",
    description: "You know what it does...",
    usage: 'spy [add|remove|list] {user id}',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        if(args[0] === 'on') {

            return client.logger.log("Spy has been enabled");
        } else if(args[0] === 'off') {

            return client.logger.log("Spy has been disabled");
        } else if(args[0] === 'list') {
            let spied = await Spied.find({});

            if(spied.length === 0)
                return client.logger.log("No results found.");

            return console.table(spied.map(s => s.toObject()));
        }

        if(args.length < 2) {
            client.logger.error("Missing userId");
            throw new Error("Invalid usage");
        }

        let add = args[0] === "add",
            user = (await client.getUserProfile(args[1])).user;

        if(user == null)
            return client.logger.error("This user doesn't exists");

        let existing = await Spied.findOne({userId: args[1]});

        if(add) {
            if(existing)
                return client.logger.error("This user already exist");

            await new Spied({userId: args[1], name: user.username}).save();
        } else {
            if(!existing)
                return client.logger.error("This user is not present in the list");

            await Spied.deleteOne({userId: args[1]});
        }

        let spied = await Spied.find({});
        client.logger.log(`User: ${user.username} (${user.id}) has been ${add ? 'added to' : 'removed from'} spy list (currently: ${spied.length} spied people)`);
    }
}