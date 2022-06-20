const client = require('../../index.js')

client.on('guildMemberRemove', member => {
    client.channels.cache.get('830817582277853234').send(`${member.user.username} 님이 서버에서 퇴장하셨어요`)
})