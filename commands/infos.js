module.exports = {
    name: "infos",
    description: "Show guild infos",
    usage: 'infos [guildid]',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        let guild = client.guilds.get(args[0]);

        if(guild == null)
            return client.logger.error("You aren't present in this guild.");

        let owner = (await client.getUserProfile(guild.ownerID)).user;
        let filteredInfos = {
            id: guild.id,
            name: guild.name,
            splash: guild.splash,
            banner: guild.banner,
            region: guild.region,
            memberCount: guild.memberCount,
            verificationLevel: guild.verificationLevel,
            joined: guild.joinedAt,
            owner: {
                id: owner.id,
                username: owner.username
            }
        }

        console.log(filteredInfos);
    }
}