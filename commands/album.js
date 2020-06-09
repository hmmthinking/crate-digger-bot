const Discord = require('discord.js');
const config = require('../config.json');
module.exports = {
    name: 'album',
    description: 'Searches for a release given an artist and album.',
    args: true,
    usage: '<artist> - <album title>',
    async execute(message, args) {
            const fetch = require('node-fetch');
            // slice 'album' out of the array and join on a space
            let allArgs = args.slice(0).join(' ');
            // now re-split it on the dash
            allArgs = allArgs.split('-');
            searchForRelease(allArgs);

            function createEmbed(json) {
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#ffffff')
                .setTitle(`${json.artists[0].name} - ${json.title}`)
                .setImage(json.images[0].uri150)
                .setDescription(`${json.year}`)
                .setFooter(json.id);

                if(json.genres) {
                    for (let i = 0; i < json.genres.length; i++) {
                        newEmbed.description += `, ${json.genres[i]}`;
                    }
                }

                if(json.styles) {
                    for(let i = 0; i < json.styles.length; i++) {
                        newEmbed.description += `, ${json.styles[i]}`;
                    }
                }

                for (let i = 0; i < json.tracklist.length; i++) {
                    newEmbed.addField(`${i + 1}`, `${json.tracklist[i].title}`);
                }

                newEmbed.addField('More info: ', `For sale: ${json.num_for_sale} from $${json.lowest_price}`, true);

                return newEmbed;
            }

            async function searchForRelease(searchTerms) {
                await fetch(`https://api.discogs.com/database/search?type=master&artist=${searchTerms[0].trim()}&release_title=${searchTerms[1].trim()}&key=${config.discogsKey}&secret=${config.discogsSecret}`).then(response => response.json())
                // .then(response => { getMasterByID(response.results[0].id); });
                .then(response => {
                    try {
                        console.log(`Searching: ${searchTerms[0].trim()} - ${searchTerms[1].trim()}`);
                            console.log(response.results[0]);
                            getMasterByID(response.results[0].id);
                    }
                    catch(e) {
                        console.error(e);
                        message.channel.send('No releases found with that name.');
                    }
                });
            }

            async function getMasterByID(id) {
                try {
                    await fetch(`https://api.discogs.com/masters/${id}?key=${config.discogsKey}&secret=${config.discogsSecret}`).then(response => response.json())
                    .then(json => {
                        try {
                            const embed = createEmbed(json);
                            message.channel.send(embed);
                        }
                        catch(e) {
                            console.error(e);
                            message.channel.send('\'Sup Gunt, I searched for a release successfully but when I went to get the master something went wrong.');
                        }
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
    },
};