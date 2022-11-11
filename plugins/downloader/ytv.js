var handler = async (msg, { 
client, text, usedPrefix, command 
}) => {
if (!text) return msg.reply(`🚩 Gunakan format ${usedPrefix + command} *<link-youtube>*\n\n*Contoh :* ${usedPrefix + command} https://youtu.be/Db3QI5OUO5o`)
require('caliph-api').downloader.youtube.ytmp4(text).then(async v => {
const vk = await client.sendImage(msg.from, v.thumb, `*乂 Y O U T U B E - V I D E O*\n\n   *◦ Title :* ${v.title}\n   *◦ Quality :* ${v.quality}\n   *◦ Size :* ${v.size}\n   *◦ Duration :* ${v.duration}\n   *◦ Views :* ${v.views}\n   *◦ Like :* ${v.like}\n   *◦ Dislike :* ${v.dislike}\n   *◦ Channel :* ${v.channel}\n   *◦ Upload  :* ${v.uploadDate}\n   *◦ Description :* ${v.desc}`, msg, { isUrl:true })
client.sendVideo(msg.from, v.result, null, vk, { isUrl:true })
})
}
handler.help = ['ytv','ytmp4']
handler.tags = ['dl']
handler.command = /^(youtubevideo|ytvideo|ytv|ytmp4)$/i

handler.limit = true

module.exports = handler
