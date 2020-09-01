const Requester = require('../utils/Requester');
const consoleTable = require('console.table');

module.exports = {
    name: "ip",
    description: "Get details about an IP address",
    usage: 'ip [ipaddress]',
    category: 'utilities',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        let details = await Requester.request(`http://ip-api.com/json/${args[0]}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);

        if(details.status === 'fail')
            return client.logger.error("Failed to get IP details (is the IP format correct ?)");

        console.table(details);
    }
}