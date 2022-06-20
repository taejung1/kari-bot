const client = require('../../index.js')
const { member  , guildId} = require('../config.json')

client.on('ready', () => {
    const guild = client.guilds.cache.get(guildId);
    setInterval(() => {
        const channel = guild.channels.cache.get(member);
        if (!channel) return;
        const size = guild.memberCount - guild.members.cache.filter(member => member.user.bot).size
        channel.setName(`👥 ┃ 인간: ${size} `);
    }, 5000);
});