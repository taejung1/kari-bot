const client = require('../../index.js')

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content == "건빵") {
        message.reply("사탕");
    }
    if (message.content == "태정") {
        message.reply("귀요미");
    }
    if (message.content == "ㅎㅇ") {
        message.reply("ㅎㅇ");
    }
})