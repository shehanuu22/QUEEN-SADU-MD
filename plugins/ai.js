//01.Ai command
const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');
const fs=require('fs');
const path=require('path');
const{readEnv}=require('../lib/database');

var desct = "It Search On Chatgpt Ai For What You Provided."
var needus = "*Please Give Me Words To Search On AI !*" 
var cantf  = "*Server Is Busy. Try Again Later.!*"

cmd({
    pattern: "ai",
    react: '👾',
    desc: desct,
    category: "ai",
    use: '.chatgpt <query>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
//let res = (await fetchJson('https://hercai.onrender.com/v3/hercai?question=' + q)).response
let res = await fetchJson('https://hercai.onrender.com/v3/hercai?question='+q)

return await reply(res.reply)
} catch (e) {
reply(cantf)
console.log(e)
}
});

> *_Created by_* 👨🏼‍💻 :- *_Sl Nethu Max Yt_*
