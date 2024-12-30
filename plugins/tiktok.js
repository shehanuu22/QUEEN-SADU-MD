import nessid from "neastooapi";

export const cmd = {
  name: ["tiktok"],
  command: ["tiktok", "tt"],
  category: ["download"],
  detail: {
    desc: "Unduh video dari TikTok menggunakan tautan",
    use: "Link TikTok",
  },
  async start({ m, text, conn }) {
    if (!text) {
      return m.reply(
        `Masukkan link TikTok untuk mengunduh video.\nContoh: !tiktok https://vt.tiktok.com/example/`
      );
    }

    try {
      // Panggil API TikTokDL menggunakan nessid
      const response = await nessid.TiktokDL(text);

      // Validasi jika respons gagal
      if (response.status !== "success" || !response.result || !response.result.video) {
        return m.reply(`Gagal memproses tautan TikTok. Pesan: ${response.result?.desc || 'Tautan tidak valid'}`);
      }

      // Ambil bagian video URL dan deskripsi
      const { video, desc, author } = response.result;

      // Kirim video dengan caption deskripsi
      await conn.sendMessage(
        m.from,
        {
          video: { url: video },
          caption: `🎥 Deskripsi: ${desc || "Tanpa deskripsi"}\n📹 Oleh: ${author?.nickname || "Anonim"}`,
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error API:", error);
      m.reply("Terjadi kesalahan saat memproses permintaan.");
    }
  },
};
