/**
 * @description 클라이언트가 실행되면 실행되는 이벤트 입니다.
*/

const client = require('../../index.js')

const { Routes } = require('discord-api-types/v9');
const { Collection } = require('discord.js');
const { REST } = require('@discordjs/rest')
const fs = require('fs');

const { token, guildId } = require('../config.json');

client.once('ready', async () => {
    console.log(client.user.username + '계정의 로그인을 시도중입니다.');
    try {
        console.log('애플리케이션 새로고침 이 시작되었습니다.');

        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guildId),
            { body: commands },
        );

        console.log('애플리케이션을 성공적으로 다시 로드했습니다.');
    } catch (error) {
        console.error(error);
    }
    console.log(client.user.username + '계정의 로그인을 완료하였습니다.');
})

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

client.slashCommands = new Collection();

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
    commands.push(command.data.toJSON());
    client.slashCommands.set(command.data.name, command)
}

const rest = new REST({ version: '9' }).setToken(token);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    if (!client.slashCommands.has(interaction.commandName)) return;
    const command = client.slashCommands.get(interaction.commandName);
    try {
        await command.execute(interaction, client)
    } catch (error) {
        console.log(`[error log] ${error}`)
    }
})

console.log('이벤트 로딩이 시작되었습니다.\n')
const event = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of event) {
    require(`../events/${file}`);
    console.log(`${file} 로딩을 완료했습니다.`)
}
console.log('\n이벤트 로딩이 완료 되었습니다.\n')
