const client = require('../../index.js')
const { logchannel } = require('../config.json')

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        if (oldMessage.content === newMessage.content) return;
        if (oldMessage.author.bot) return;
        let embed = new (require('discord.js')).MessageEmbed()
            .setDescription(`수정된 메시지 위치 <#${oldMessage.channel.id}>`)
            .setColor('#2F3136')
            .addField('**시간**', `<t:${time}:F>`)
            .addField('**수정 전 메시지**', oldMessage.content)
            .addField('**수정 후 메시지**', newMessage.content)
            .addField('**아이디**', `\`\`\`cs\n유저 = ${oldMessage.author.id} \n채널 = ${oldMessage.channel.id}\`\`\``)
            .setAuthor(`${oldMessage.author.tag}`, oldMessage.author.displayAvatarURL(``))
            .setTimestamp();
        client.channels.cache.get(logchannel).send({ embeds: [embed] });
    } catch (error) {
        console.log(error);
    };
});