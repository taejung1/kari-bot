const client = require('../../index.js')

module.exports = {
    data: new (require('@discordjs/builders')).SlashCommandBuilder()
        .setName('가입')
        .setDescription('화리트 리스트와 부원목록에 본인을 추가합니다.')
        .addStringOption(option => option.setName('이름').setRequired(true).setDescription('마인크래프트 아이디')),
    /**
     * @param {import('discord.js').CommandInteraction} interaction 
    */
    async execute(interaction) {
        let name = interaction.options.getString('이름');
        await interaction.deferReply()
        try {
            interaction.editReply(`${interaction.user.username}님 화이트 리스트 등록이 완료되었습니다\n마인크래프트 닉네임 : ${name}\n화이트리스트 등록이 안될시 닉네임을 확인해주세요.`)
            client.channels.cache.get('873921394893803530').send(`whitelist add ${name}`)
            (require('node-fetch')).fetch('https://api.mojang.com/users/profiles/minecraft/' + name).then(res => res.json()).then(async json => {
                client.channels.cache.get('945496318829264906').send(`${interaction.user.tag} ${name} ${json.id}`)
            })
        } catch (error) {
            interaction.editReply({ content: "오류가 발생했습니다. 사유는 아래와 같습니다.\n 1. 닉네임이 올바르지 않습니다\n2.일반적인 봇 오류\n3.모장 서버 오류\n모르시겠다면 관리자에게 문의바랍니다", ephemeral: true });
        }
    }
};