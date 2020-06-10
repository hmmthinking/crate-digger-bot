const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
    name: 'artistsearch',
    description: 'Returns a list of artists that match a criteria.',
    args: true,
    usage: '<artist>',
    async execute(message, args) {
        console.log('artistSearch called!');
        const fetch = require('node-fetch');
        const allargs = args.slice(0).join(' ');

        searchForArtist(allargs);

        function createEmbed(json) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#ffffff')
            .setTitle(`Searching artists for ${allargs}`);
            //if (json.results.length <= 10) {
                for (let i = 0; i < json.results.length; i++) {
                    newEmbed.addField(`'${i}': [${json.results[i].title}](https://www.discogs.com${json.results[i].uri})`);
                }
            //}

            return newEmbed;
        }

        async function searchForArtist(search) {
            await fetch(`https://api.discogs.com/database/search?q=${search}&type=artist&key=${config.discogsKey}&secret=${config.discogsSecret}`)
            .then(response => response.json())
            .then(response => {
                try {
                    const embed = createEmbed(response);
                    message.channel.send(embed);

                }
                catch(e) {
                    console.error(e);
                    message.channel.send('No artists found.');
                }
            });
        }
    },
};