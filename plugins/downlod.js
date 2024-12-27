const axios = require('axios')
const { cmd } = require('../command')
// MR DINESH

cmd({
    pattern: "spotify",
    alias: ["spotifydl", "song"],
    desc: "Download songs from Spotify",
    category: "downloader",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        // Check if Spotify URL is provided
        if (!args[0]) {
            return reply("Please provide a Spotify song URL\nExample: .spotify https://open.spotify.com/track/...")
        }

        // Send processing message
        const processingMessage = await reply("🎶 Downloading Spotify track... Please wait.\n> Thenux")

        // Fetch song details from API
        const response = await axios.get(`https://www.dark-yasiya-api.site/download/spotify`, {
            params: { url: args[0] }
        })

        const songData = response.data.result

        // Construct song details message
        const songMessage = `🎵 *Spotify Song Download* 🎵

*Title:* ${songData.title}\n
*Artist:* ${songData.author}\n

> QUEEN SADU🌝

📥 Downloading...`

        // Send song thumbnail
        await conn.sendMessage(from, {
            image: { url: songData.thumbnail },
            caption: songMessage
        })

        // Send audio file
        await conn.sendMessage(from, {
            audio: { url: songData.music },
            mimetype: 'audio/mpeg',
            fileName: `${songData.title} - ${songData.author}.mp3`
        }, { quoted: mek })

        // Delete processing message
        await conn.sendMessage(from, { delete: processingMessage.key })

    } catch (error) {
        console.error("Spotify Download Error:", error)
        reply("Failed to download the song. Please check the URL and try again.")
    }
})


//====================video_dl=======================

cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
⫷⦁[ * '-'_꩜ 𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝙈𝘿 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍 ꩜_'-' * ]⦁⫸ 

🎥 *Video Found!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *Enjoy the video brought to you by* *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 Bot*! 

> *Created with 💛 by 𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇* 

> *© 𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 - MD* 
*💻 GitHub:* https://github.com/Navinofc44/DARK-ZERO-MD
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© QUEEN SADU - MD*"},{quoted:mek})

}catch(e){
console.log(e)
  reply('𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍 𝚍𝚘𝚠𝚗𝚕𝚘𝚍')
}
})
