const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); // request package.json "@dark-yasiya/yt-dl.js": "latest"


cmd({
    pattern: "song",
    alias: ["ytmp3","ytsong"],
    react: "🎶",
    desc: "Download Youtube song",
    category: "download",
    use: '.song < Yt url or Name >',
    filename: __filename
},
async(conn, mek, m,{ from, prefix, quoted, q, reply }) => {
try{

if(!q) return await reply("Please give me Yt url or Name")
	
const yt = await ytsearch(q);
if(yt.results.length < 1) return reply("Results is not found !")

let yts = yt.results[0]  
const ytdl = await ytmp3(yts.url)
		
let ytmsg = `🎶 SONG DOWNLOADER 🎶


🎵 *TITLE :* ${yts.title}
🤵 *AUTHOR :* ${yts.author.name}
⏱ *RUNTIME :* ${yts.timestamp}
👀 *VIEWS :* ${yts.views}
🖇️ *URL :* ${yts.url}
`
// SEND DETAILS
await conn.sendMessage(from, { image: { url: yts.thumbnail || yts.image || '' }, caption: `${ytmsg}`}, { quoted: mek });

// SEND AUDIO TYPE
await conn.sendMessage(from, { audio: { url: ytdl.download.url }, mimetype: "audio/mpeg" }, { quoted: mek })

// SEND DOC TYPE
await conn.sendMessage(from, { document: { url: ytdl.download.url }, mimetype: "audio/mpeg", fileName: ytdl.result.title + '.mp3', caption: `${ytdl.result.title}` }, { quoted: mek })


} catch (e) {
console.log(e)
reply(e)
}}
)

//==================== Video downloader =========================

cmd({
    pattern: 'video',
    desc: 'download videos',
    react: "🎬",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ 𝗾𝘂𝗲𝗲𝗻 𝘀𝗮𝗱𝘂 𝗯𝘆 𝗺𝗿 𝗱𝗶𝗻𝗲𝘀𝗵💗`,
                    orderTitle: "",
                    sellerJid: '94704227534@s.whatsapp.net'
                }
            }
        };
        
        if (!q) return reply('*Please enter a query or a url !*');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `*🧚‍♂️⃝ QUEEN SADU VIDEO DOWNLOADER 🩷⃟🧚‍♂️*
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url}
*|__________________________*

*🔢 Reply Below Number :*

*1 Video File🎬*
*2 Document File📁*

*🔢 Reply Below Number :*

*👨‍💻 Qᴜᴇᴇɴ ꜱᴀᴅᴜ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ 👨‍💻*`;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        let downvid = await fg.ytv(url);
                        let downloadvUrl = downvid.dl_url;
                        await conn.sendMessage(from, { video : { url:downloadvUrl }, caption: '*👨‍💻 Qᴜᴇᴇɴ ꜱᴀᴅᴜ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ 👨‍💻*', mimetype: 'video/mp4'},{ quoted: qMessage });
                        break;
                    case '2':
                        let downviddoc = await fg.ytv(url);
                        let downloadvdocUrl = downviddoc.dl_url;
                        await conn.sendMessage(from, { document: { url:downloadvdocUrl }, caption: '*👨‍💻 Qᴜᴇᴇɴ ꜱᴀᴅᴜ ʙʏ ᴍʀ ᴅɪɴᴇꜱʜ👨‍💻*', mimetype: 'video/mp4', fileName:data.title + ".mp4" }, { quoted: qMessage });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


//===================== img downloader ========================

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ 𝐐𝐮𝐞𝐞𝐧 𝐬𝐚𝐝𝐮 𝐛𝐲 𝐦𝐫 𝐝𝐢𝐧𝐞𝐬𝐡 💗`,
                    orderTitle: "",
                    sellerJid: '94704227534@s.whatsapp.net'
                }
            }
        };
        
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
🌟 *Image ${i + 1} from your search!* 🌟
        *Enjoy these images! 📸*

*👨‍💻 Qᴜᴇᴇɴ 𝚜𝚊𝚍𝚞 𝚋𝚢 𝚖𝚛 𝚍𝚒𝚗𝚎𝚜𝚑👨‍💻*
`
}, { quoted: qMessage });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

//======================= fb downloader ===================================================================

const { fetchJson } = require('../lib/functions')
const config = require('../config')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//fb downloader
cmd({
    pattern: "fb",
    desc: "Download fb videos",
    category: "download",
    react: "#️⃣",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Facebook video URL!");
        const data = await fetchJson(`${baseUrl}/api/fdown?url=${q}`);
        let desc = ` *🧚‍♂️ QUEEN 𝚂𝙰𝙳𝚄 FB DOWNLOADER 🧚‍♂️*

*🔢 Reply Below Number :*

*1 Download HD Quality*
*2 Download SD Quality*

*👨‍💻 Qᴜᴇᴇɴ 𝚜𝚊𝚍𝚞 𝚋𝚢 𝚖𝚛 𝚍𝚒𝚗𝚎𝚜𝚑 👨‍💻*`;

        const vv = await conn.sendMessage(from, { image: { url:"https://i.postimg.cc/xdMvP3XZ/In-Shot-20241222-002123636.jpg"}, caption: desc }, { quoted: mek });
        
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.hd }, mimetype: "video/mp4", caption: "*👨‍💻 Qᴜᴇᴇɴ 𝚜𝚊𝚍𝚞 𝚋𝚢 𝚖𝚛 𝚍𝚒𝚗𝚎𝚜𝚑 👨‍💻*" }, { quoted: mek });
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.sd }, mimetype: "video/mp4", caption: "" }, { quoted: mek });
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});

//=========================== apk downloader ==============================

cmd({
    pattern: "apk",
    react: '📦',
    desc: "Download apk.",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {
    const snm = [2025];
        
        // The quoted message template
        const qMessage = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                orderMessage: {
                    itemCount: snm[Math.floor(Math.random() * snm.length)], // Random selection
                    status: 1,
                    surface: 1,
                    message: `✨ Qᴜᴇᴇɴ 𝚜𝚊𝚍𝚞 𝚋𝚢 𝚖𝚛 𝚍𝚒𝚗𝚎𝚜𝚑 💗`,
                    orderTitle: "",
                    sellerJid: '94704227534@s.whatsapp.net'
                }
            }
        };

await m.react("🔄")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*🧚‍♂️⃝ QUEEN SADU MD APK DOWNLOADER 🩷⃟🧚‍♂️*
*╭──📦 APK Details 📦──◦•◦►•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰───────────────◦•◦►•*\n\n\*👨‍💻 Qᴜᴇᴇɴ 𝚜𝚊𝚍𝚞 𝚋𝚢 𝚖𝚛 𝚍𝚒𝚗𝚎𝚜𝚑 👨‍💻*`

await conn.sendMessage(from,{image: {url: data.datalist.list[0].icon},caption: desc},{quoted: mek})
await conn.sendMessage(from,{document: {url: data.datalist.list[0].file.path_alt},fileName: data.datalist.list[0].name,mimetype: 'application/vnd.android.package-archive',caption: `*👨‍💻 Qᴜᴇᴇɴ Sadu by mr dinesh 👨‍💻*`},{ quoted: qMessage });
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})
