import nessid from 'neastooapi';

export const cmd = {
    name: ['facebook'],
    command: ['fb', 'facebook', 'fbdl'],
    category: ['download'],
    detail: {
        desc: 'Unduh dan putar video MP4 dari Facebook menggunakan tautan',
        use: 'link facebook',
    },
    async start({ m, text, conn }) {
        if (!text) {
            return m.reply(
                `Masukkan link Facebook untuk mengunduh video MP4.\nContoh: !facebook https://www.facebook.com/example`
            );
        }

        try {
            // Panggil API FacebookDL menggunakan nessid
            const response = await nessid.facebookDL(text);

            // Validasi jika respons gagal
            if (!response || !response.sd) {
                return m.reply(`Gagal memproses tautan Facebook. Pesan: ${response?.desc || 'QUEEN SADU'}`);
            }

            // Ambil URL video SD
            const videoUrlToSend = response.sd;

            // Kirim video dengan caption deskripsi (jika ada)
            await conn.sendMessage(
                m.from,
                {
                    video: { url: videoUrlToSend },
                    caption: '🎥 *Video ditemukan...*',
                },
                { quoted: m }
            );
        } catch (error) {
            console.error("Error API:", error);
            m.reply('Terjadi kesalahan saat memproses permintaan.');
        }
    },
};
