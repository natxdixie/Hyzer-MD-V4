var handler = async(msg, { 
client, args, usedPrefix, command
}) => {
var isClose = {
'open': 'not_announcement',
'buka': 'not_announcement',
'on': 'not_announcement',
'1': 'not_announcement',
'close': 'announcement',
'tutup': 'announcement',
'off': 'announcement',
'0': 'announcement',
}[(args[0] || '')]
if (isClose === undefined) {
await client.reply(msg.from, `*CONTOH PENGGUNAAN*\n\n • ${usedPrefix + command} buka\n • ${usedPrefix + command} tutup`, msg, { buttons: [{buttonId: `.group buka`, buttonText: {displayText: 'BUKA'}, type: 1}, {buttonId: `.group tutup`, buttonText: {displayText: 'TUTUP'}, type: 1}], headerType: 4, footer: wm })
return false
}
await client.groupSettingUpdate(msg.from, isClose)
msg.reply(Only.success)
}
handler.help = ['grup <buka/tutup>']
handler.tags = ['group']
handler.command = /^(grup|group)$/i

handler.group = true
handler.admin = true
handler.botAdmin = true

module.exports = handler
