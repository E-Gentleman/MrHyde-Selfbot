module.exports = async (client) => {
    console.log(`\n« Jekyll had more than a father’s interest;\n  Hyde had more than a son’s indifference. »\n — Dr. Jekyll & Mr. Hyde\n`);

    client.logger.success(`I'm ready Jekyll, say ${"help".underline} for a list of commands !`);

    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', text => {
        let splitted = text.trim().split(' '),
            cmd = splitted.shift();

        if(!client.commands.has(cmd))
            return client.logger.log("This command doesn't exist, type help for a list of commands");

        let command = client.commands.get(cmd);
        command.execute(client, splitted).catch(e => {
            if(e.message.toLowerCase().indexOf("usage") > -1)
                return client.logger.error(`Usage: ${command.usage}`)

            console.error(e);
        });
    });
}