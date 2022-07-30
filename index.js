const client = new (require('discord.js')).Client({ intents: 32767 });
module.exports = client;
require('./src/client/kariclient.js')
client.login((require('./src/config.json').token));
process.on('uncaughtException', function (error) { console.warn(error); });

