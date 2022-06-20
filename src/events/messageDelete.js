const client = require('../../index.js')
const { logchannel } = require('../config.json')

client.on('messageDelete', async message => {
    if (message.author.bot) return
    try {
        if (message.content === ('')) {
            let embed = new (require('discord.js')).MessageEmbed()
                .setDescription(`삭제된 메시지 위치 <#${message.channel.id}>`)
                .setColor('#2F3136')
                .addField('**내용**', '없음 (사진)')
                .addField('**시간**', `<t:${time}:F>`)
                .addField('**아이디**', `\`\`\`cs\n유저 = ${message.author.id} \n채널 = ${message.channel.id}\`\`\``)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL(``))
                .setTimestamp()
            client.channels.cache.get(logchannel).send({ embeds: [embed] })
        } else {
            const embed = new (require('discord.js')).MessageEmbed()
                .setDescription(`삭제된 메시지 위치 <#${message.channel.id}>`)
                .setColor('#2F3136')
                .addField('**내용**', message.content)
                .addField('**시간**', `<t:${time}:F>`)
                .addField('**아이디**', `\`\`\`cs\n유저 = ${message.author.id} \n채널 = ${message.channel.id}\`\`\``)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL(``))
                .setTimestamp()
            client.channels.cache.get(logchannel).send({ embeds: [embed] })
        }
    } catch (error) {
        console.log(error);
    };
});

