const Discord = require('discord.js');

module.exports = {
    name: 'intro',
    description: 'Introduces crate digger bot.',
    execute(message, args) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0F9B8E')
        .setTitle('Crate Digger Bot')
        .setDescription('A bot for querying Discogs (and beyond?)')
        .addFields(
            { name: 'What does Crate Digger Bot do?', value: 'Crate Digger Bot is being designed to get vinyl info from Discogs.' },
            { name: 'Does it do anything else?', value: 'Not at the moment.' },
        )
        .setFooter('Use !help to get DM\'d a list of commands');

        message.channel.send(newEmbed);
    },
};