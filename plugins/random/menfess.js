var handler = async(msg, { 
client, text, usedPrefix
}) => {
if (!text) return msg.reply(`🚩 Gunakan format ${usedPrefix}menfess <nomor penerima>|<nama pengirim>|<isi menfess>\n\n*Contoh :* ${usedPrefix}menfess 6287892711054|Temenmu|Hi, I Have Crush On You.`)
try {
var [a, b, c] = text.split`|`
if (a + '@s.whatsapp.net' === msg.sender) return msg.reply('🚩 Tidak dapat mengirim menfess kepada diri sendiri.')
if (a + '@s.whatsapp.net' === client.user.jid) return msg.reply('🚩 Tidak dapat mengirim menfess kepada bot ini.')
client.reply(a + '@s.whatsapp.net', `*PESAN RAHASIA BOT*

*Pengirim :* ${b}
*Pesan :* ${c}

Ingin membuat pesan rahasia kepada seseorang juga? 
ketik #menfess <nomor penerima>|<nama pengirim>|<isi menfess>`, null)
msg.reply(`🚩 Berhasil mengirim menfess.`)
} catch(e) {
msg.reply('🚩 Nomor invalid.')
throw e
}
}
handler.help = ['menfess']
handler.tags = ['random']
handler.command = /^(menfess)$/i

module.exports = handler
