const ActivitiesAnalytic = require('../models/ActivitiesAnalytic');
const consoleTable = require('console.table');

module.exports = {
    name: "activities",
    description: "Displays various activities analytics",
    usage: 'activities {JSON Query}',
    category: 'analytics',
    execute: async (client, args) => {
        if(args.length === 0)
            args = ["{}"]

        let analytics = await ActivitiesAnalytic.find(JSON.parse(args.join(' ')))
            .sort({points: 'desc'});

        if(analytics.length > 0)
            return console.table(analytics.map((a) => {
                let o = a.toObject();

                return {
                    name: o.name,
                    points: o.points,
                    players: o.players.length
                }
            }));

        client.logger.log("No results found");
    }
}