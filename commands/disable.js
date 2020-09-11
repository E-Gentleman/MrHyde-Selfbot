const Requester = require('../utils/Requester');

module.exports = {
    name: "disable",
    description: "Disable account owning the passed token",
    usage: 'disable [target token]',
    category: 'malicious',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        let earlier = new Date();
        earlier.setFullYear(earlier.getFullYear() - 12);

        //Discord automatically disable accounts whose owners are under 13 yo ;)
        let response = await Requester.discordRequest(
            '/users/@me',
            'PATCH',
            {'date_of_birth': `${earlier.getFullYear()}-${earlier.getMonth() + 1}-${earlier.getDate()}`},
            args[0]
        );

        if(response.code === 0)
            return client.logger.error("Cannot disable this account.");

        return client.logger.log("Account disabled.");
    }
}