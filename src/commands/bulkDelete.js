const { Permissions } = require('discord.js');

module.exports = {
    data: new (require('@discordjs/builders')).SlashCommandBuilder()
        .setName('청소')
        .setDescription('채널 메세지를 삭제해요!')
        .addIntegerOption(option => option.setName("count").setDescription("삭제 할 메시지 개수를 입력하세요.").setRequired(true)),
    /** 
     * @param {import('discord.js').CommandInteraction} interaction 
    */
    async execute(interaction) {
        const amount = interaction.options.getInteger('count');
        await interaction.deferReply()
        if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.editReply("권한이 없습니다")
        try {
            if (amount > 100) return interaction.editReply({ content: `100이상의 수는지울수 없어요`, ephemeral: true })
            if (amount < 1) return interaction.editReply({ content: `1미만의 수는 삭제할수없어요`, ephemeral: true })

            await interaction.channel.bulkDelete(amount, true)

            return interaction.editReply(`현재 채널에서 **${amount}** 개의 메시지를 삭제했어요!`)
        } catch (err) {
            interaction.editReply({ content: "채팅메세지 삭제중 오류가발생하였습니다 \n 오류 : " + err, embeds: [], ephemeral: true });
        }
    }
};