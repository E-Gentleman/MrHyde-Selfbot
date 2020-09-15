const Requester = require('../utils/Requester');

module.exports = {
    name: "version",
    description: "Print and check Mr.Hyde version",
    usage: 'version',
    category: 'utilities',
    execute: async (client, args) => {
        const current = require('../version.json').version;

        client.logger.log(`You're running Mr.Hyde v${current}`);
        client.logger.log("Checking for updates...");

        try {
            const latest = await Requester.request(
                "https://raw.githubusercontent.com/E-Gentleman/MrHyde-Selfbot/master/version.json",
                'GET'
            );

            if(current < latest.version)
                return client.logger.info(`A new Mr.Hyde version (v${latest.version}) is available at https://github.com/E-Gentleman/MrHyde-Selfbot`);

            client.logger.log("You're running latest version.");
        } catch (e) {
            client.logger.error("Cannot check for newer versions.");
        }
    }
}