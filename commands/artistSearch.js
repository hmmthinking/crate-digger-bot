const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
    name: 'artistsearch',
    description: 'Returns a list of artists that match a criteria.',
    args: true,
    usage: '<artist>',
    async execute(message, args) {
        const fetch = require('node-fetch');
        const allargs = args.slice(0).join(' ');

        searchForArtist(allargs);

        function createEmbed(json) {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#ffffff')
            .setTitle(`Searching Artists for ${allargs}`);
            if (json.results.length < 10 && json.results.length > 0) {
                for (let i = 0; i < json.results.length; i++) {
                    newEmbed.addField(`${i + 1}`, `[${json.results[i].title}](https://www.discogs.com${json.results[i].uri})`, true);
                }
            }
            else if (json.results.length > 10) {
                for (let i = 0; i < 10; i++) {
                    newEmbed.addField(`${i + 1}`, `[${json.results[i].title}](https://www.discogs.com${json.results[i].uri})`, true);
                }
            }
            else {
                newEmbed.addField('No Results', 'No Results');
            }

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