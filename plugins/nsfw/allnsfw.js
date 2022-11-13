var handler = async (msg, { 
client, command 
}) => {
msg.reply(Only.wait)
var bufer = await Func.pickJson('./system/database/nsfw/' + command + '.json')
if (!bufer) return false
client.sendImage(msg.from, bufer, '🚩 Random Image ' + command + '.', msg, {
isUrl:true,
buttons: [{buttonId: `.${command}`, buttonText: {displayText: 'NEXT'}, type: 1}],
headerType: 5, 
footer: wm 
})
}
handler.command = handler.help = ['ahegao','ass','bdsm','blowjob','cuckold','cum','ero','femdom','foot','gangbang','glasses','hentai','jahy','masturbation','nsfwloli','nsfwmanga','nsfwneko','orgy','panties','pussy','tentacles','thighs','yuri','zettai']
handler.tags = ['nsfw']
handler.nsfw = true

module.exports = handler

// tambah sendiri adReplynya kalau mau
