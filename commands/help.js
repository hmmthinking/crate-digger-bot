const { prefix } = require('../config.json');
module.exports = {
    name: 'help',
    description: 'Lists commands or info about specific commands.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        // a lot of this is taken directly from https://discordjs.guide/command-handling/adding-features.html#a-dynamic-help-command
        const data = [];
        const { commands } = message.client;
        if(!args.length) {
            data.push('So here\'s the deal, I take these commands:');
            data.push(commands.map(command => command.name).join('\n '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with a list of commands.');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}. \n`, error);
                    message.reply('Looks like I couldn\'t slide into ur DMs for some reason.');
                });
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command) {
            return message.reply('That\'s not a valid command!');
        }
        data.push(`**Name** ${command.name}`);
        if(command.aliases) {
            data.push(`**Aliases: ** ${command.aliases.join(', ')}`);
        }
        if(command.description) data.push(`**Description: ** ${command.description}`);
        if(command.usage) data.push(`**Usage: ** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown: ** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};