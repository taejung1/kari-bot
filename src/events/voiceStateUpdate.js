const client = require('../../index.js')
const { voice } = require('../config.json')

client.on('voiceStateUpdate', async (newState, oldState) => {
    const channel = newState.guild.channels.cache.find(c => c.id === voice);
    if (newState.member.voice.channel) {
        if (!channel) return
        if (newState.member.voice.channel.id !== channel.id) return
        newState.guild.channels.create(`${newState.member.user.username}'s Channel`, {
            type: "GUILD_VOICE",
            parent: oldState.channel.parent
        }).then(ch => {
            if (!ch) return
            newState.member.voice.setChannel(ch)
            ch.permissionOverwrites.edit(newState.member.id, { DEAFEN_MEMBERS: true, MOVE_MEMBERS: true, MANAGE_CHANNELS: true });
            const interval = setInterval(() => {
                if (ch.deleted == true) {
                    clearInterval(interval)
                    return;
                }
                if (ch.members.size == 0) {
                    ch.delete()
                    return;
                }
            }, 4000);
        })
    }
})