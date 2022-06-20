/**
 * @file 이 파일은 아마이 카리 봇의 메인파일 입니다.
 * @author 태정
 * @version 0.0.2
 * @copyright (C) 태정
 * @description 무단배포및 소스코드 공개를 금지합니다
 * @license ISC
*/

const client = new (require('discord.js')).Client({ intents: 32767 });
module.exports = client;
require('./src/client/kariclient.js')
client.login((require('./src/config.json').token));
process.on('uncaughtException', function (error) { console.warn(error); });

