const ActivitiesAnalytic = require('../models/ActivitiesAnalytic');
const Spied = require('../models/Spied');

module.exports = async (client, other, oldPresence) => {
    let user = other.user,
        spied = await Spied.findOne({userId: user.id});

    if(spied)
        client.notifier.notify(user.username, "User status changed");

    if(oldPresence && oldPresence.activities) {
        for(const activity of oldPresence.activities.filter(a => a.application_id !== null && a.application_id !== undefined)) {
            await ActivitiesAnalytic.findOneAndUpdate({
                name: activity.name
            }, {
                $inc: {
                    points: 1
                },
                $addToSet: {
                    players: user.id
                }
            }, {upsert: true, new: true});
        }
    }

    if(other.activities) {
        for(const activity of other.activities.filter(a => a.application_id !== null && a.application_id !== undefined)) {
            await ActivitiesAnalytic.findOneAndUpdate({
                name: activity.name
            }, {
                $inc: {
                    points: 1
                },
                $addToSet: {
                    players: user.id
                }
            }, {upsert: true, new: true});
        }
    }
}