module.exports = {
    name: "dnd",
    description: "Enable/Disable do not disturb mode or set message",
    usage: 'dnd [on|off|message] {message}',
    execute: async (client, args) => {
        if(args.length < 1)
            throw new Error("Invalid usage");

        if(args[0] === "message") {
            if(args.length < 2) {
                client.logger.error("Missing message");
                throw new Error("Invalid usage");
            }

            args.shift();
            client.config.set('modules.dnd.message', args.join(' '))
                .save();

            return client.logger.log(`DND message has been updated to ${client.config.modules.dnd.message}`);
        }

        let on = args[0] === "on";
        client.config.set('modules.dnd.enabled', on)
            .save();

        client.logger.log(`DND status set to ${on ? "on" : "off"}`);
    }
}