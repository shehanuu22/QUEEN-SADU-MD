const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
cmd({
    pattern: ".<",
    react: "✅",
    alias: ["uptime","status","runtime"],
    desc: "cheack uptime",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let status = `*╭──────────●●►*
*QUEEN-SADU UPTIME LIST↷*

*_UPTIME:➠_*  ${runtime(process.uptime())}

*_RAM USAGE:➠_* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

*_HOSTNAME:➠_* ${os.hostname()}

*_OWNER:➠_* *MR DINESH*

*_SUPPORT:➠_*𝐌𝐑 𝐋𝐀𝐊𝐒𝐇𝐀𝐍

*_channal link »_*https://whatsapp.com/channel/0029Vb0Anqe9RZAcEYc2fT2c*

*╰──────────●●►*
`
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:`${status}`},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
