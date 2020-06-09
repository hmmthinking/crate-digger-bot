const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
    name: 'artistSearch',
    description: 'Returns a list of artists that match a criteria.',
    args: true,
    usage: '<artist>',
    async execute(message, args) {
        const fetch = require('node-fetch');
        let allargs = args.slice(0).join(' ');

        return message.channel.send('This is where artistSearch goes.');

        function createEmbed(json) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#ffffff');
        }

        async function searchForArtist(search) {
            await fetch(`https://api.discogs.com/database/search?q=${search}&type=artist&key=${config.discogsKey}&secret=${config.discogsSecret}`)
            .then(response => response.Json())
            .then(response => {
                try {
                    // creating an embed
                }
                catch(e) {
                    console.error(e);
                    message.channel.send('No artists found.');
                }
            })
        }
    },
};