const client = require('../../index.js')
const { activit } = require('../config.json')

client.once('ready',()=>{
    let number = 0
    setInterval(() => {
        if(number == activit.length) number = 0
        client.user.setActivity(activit[number],{
            type:"PLAYING"
        })
        number++
    }, 3000) 
})