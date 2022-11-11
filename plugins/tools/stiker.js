var fs = require('fs')
var handler = async(msg, {
client, args, usedPrefix, command
}) => {
const fzer = (msg.quoted || msg)
const quoted = (fzer.mtype == 'buttonsMessage') ? fzer[Object.keys(fzer)[1]] : (fzer.mtype == 'templateMessage') ? fzer.hydratedTemplate[Object.keys(fzer.hydratedTemplate)[1]] : (fzer.mtype == 'product') ? fzer[Object.keys(fzer)[0]] : msg.quoted ? msg.quoted : msg
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
if (/image/.test(mime)) {
let media = await client.downloadMediaMessage(qmsg)
let encmedia = await client.sendImageAsSticker(msg.from, media, msg, { packname: args[0] || Info.packname, author: args[1] || Info.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if (qmsg.seconds > 11) return msg.reply('🚩 Maksimal 10 detik!')
let media = await client.downloadMediaMessage(qmsg)
let encmedia = await client.sendVideoAsSticker(msg.from, media, msg, { packname: args[0] || Info.packname, author: args[1] || Info.author })
await fs.unlinkSync(encmedia)
} else {
msg.reply(`🚩 Kirim/reply gambar/video/gif dengan caption ${usedPrefix + command}\nDurasi Video/Gif 1-9 Detik`)
}
}
handler.help = ['sticker','s','stickergif','sgif']
handler.tags = ['tools']
handler.command = /^(sticker|s|sgif|stickergif|stiker|stickergif)$/i

module.exports = handler