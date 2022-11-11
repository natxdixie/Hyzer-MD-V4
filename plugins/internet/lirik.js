var handler = async(msg, { 
text, usedPrefix, command
}) => {
if (!text) return msg.reply(`🚩 Gunakan format ${usedPrefix + command} <query>`)
try {
require('@bochilteam/scraper').lyricsv2(text).then(async v => {
let vG = await Scraper.pinterest(v.author)
let rs = await Func.pickRandom(vG)
client.sendImage(msg.from, rs, `*${v.title} - ${v.author}*\n\n${v.lyrics}`, msg, { isUrl: true })
})
} catch {
msg.reply(`🚩 Hasil tidak ditemukan.`)
}
}
handler.help = ['lirik','lyrics']
handler.tags = ['web']
handler.command = /^(lirik|lyrics)$/i

handler.limit = true

module.exports = handler
