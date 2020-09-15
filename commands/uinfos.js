module.exports = {
    name: "uinfos",
    description: "Show user infos",
    usage: 'uinfos [userId]',
    category: 'utilities',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        try {
            let profile = await client.getUserProfile(args[0]);

            console.log({
                id: profile.user.id,
                username: `${profile.user.username}#${profile.user.discriminator}`,
                avatar: `https://cdn.discordapp.com/avatars/${profile.user.id}/${profile.user.avatar}.png?size=1024`,
                hasNitroSince: profile.premium_since || "Hasn't nitro",
                accounts: profile.connected_accounts,
                mutualGuilds: profile.mutual_guilds
            });
        } catch (e) {
            client.logger.error(`Cannot find user with id: ${args[0]}`);
        }
    }
}