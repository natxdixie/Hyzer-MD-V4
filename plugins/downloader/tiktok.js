var handler = async(msg, { 
client, text, usedPrefix, command
}) => {
if (!text) return msg.reply(`Gunakan format ${usedPrefix + command} *link tiktok*`)
require('../../system/tiktok')(text).then(async v => {
var imageMess = await client.sendImage(msg.from, v.thumbnail, `*乂 T I K T O K - D O W N L O A D E R*

     *◦ Caption :* ${v.title}
     *◦ Creator :* ${v.author}
     *◦ Fetching :* ${Func.speedNow()}
     
_Tunggu sebentar, sedang mengirim media...._`, msg, { isUrl: true })
if (command === 'tiktok' || command == 'tiktokvideo' || command == 'tiktokvid' || command == 'tiktoknowm' || command == 'tiktokmp4') {
client.sendVideo(msg.from, v.nowm, null, imageMess, { isUrl:true })
}
if (command === 'tiktokaudio' || command == 'tiktoka' || command == 'tiktokmp3' || command == 'tiktokaud') {
client.sendAudio(msg.from, v.audio, imageMess, { isUrl:true })
}
})
}
handler.help = ['tiktok','tiktokaudio']
handler.tags = ['dl']
handler.command = /^(tiktok|tiktokvideo|tiktokvid|tiktoknowm|tiktokmp4|tiktokaudio|tiktoka|tiktokmp3|tiktokaud)$/i

handler.limit = true

module.exports = handler

// ga mau ribet 🗿
