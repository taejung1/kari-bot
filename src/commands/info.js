const { SlashCommandBuilder } = require('@discordjs/builders');

const name = '```카건동 정보```'
const title = '본 서버 : kabula.kr'
const map = '다이나닉맵 : https://maps.kabula.kr/'
const version = '서버 버전 : 1.18.2 - 1.19'
const cafe = '네이버 카폐 : https://cafe.naver.com/kabula'
const wiki = '위키 :  https://wiki.kabula.kr'

module.exports = {
    data: new (require('@discordjs/builders')).SlashCommandBuilder()
        .setName('정보')
        .setDescription('카스테라 건축 동아리의 서버정보를 알려줘요!'),
    /**
     * @param {import('discord.js').CommandInteraction} interaction 
    */
    async execute(interaction) {
        await interaction.deferReply()
        try {
            interaction.editReply(`${name}\n${title}\n${map}\n\n${version}\n\n${cafe}\n${wiki}`)
        } catch (error) {
            interaction.editReply({ content: "오류가 발생했습니다" + error, ephemeral: true });
        }
    }
};
