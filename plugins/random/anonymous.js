async function handler(msg, { command }) {
var author = '_© Anonymous - WhatsApp Bot_'
command = command.toLowerCase()
this.anonymous = this.anonymous ? this.anonymous : {}
switch (command) {
case 'next':
case 'leave': {
let room = Object.values(this.anonymous).find(room => room.check(msg.sender))
if (!room) return this.reply(msg.from, '_Kamu tidak sedang berada di anonymous chat_', msg, { buttons: [{buttonId: `.start`, buttonText: {displayText: 'Cari Partner'}, type: 1}], headerType: 5, footer: author })
msg.reply('🚩 Berhasil meninggalkan partner.')
let other = room.other(msg.sender)
if (other) return this.reply(other, '_Partner telah meninggallkan chat_', msg, { buttons: [{buttonId: `.start`, buttonText: {displayText: 'Cari Partner Lagi'}, type: 1}], headerType: 5, footer: author })
delete this.anonymous[room.id]
if (command === 'leave') break
}
case 'start': {
if (Object.values(this.anonymous).find(room => room.check(msg.sender))) return this.reply(msg.from,  '_Kamu masih berada di dalam anonymous chat, menunggu partner_', msg, { buttons: [{buttonId: `.leave`, buttonText: {displayText: 'Keluar'}, type: 1}], headerType: 5, footer: author })
let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(msg.sender))
if (room) {
await this.reply(room.a, '_Partner Ditemukan_', msg, { buttons: [{buttonId: `.next`, buttonText: {displayText: 'Next'}, type: 1}], headerType: 5, footer: author })
room.b = msg.sender
room.state = 'CHATTING'
await this.reply(room.b, '_Partner Ditemukan_', msg, { buttons: [{buttonId: `.next`, buttonText: {displayText: 'Next'}, type: 1}], headerType: 5, footer: author })
} else {
let id = + new Date
this.anonymous[id] = {
id,
a: msg.sender,
b: '',
state: 'WAITING',
check: function (who = '') {
return [this.a, this.b].includes(who)
},
other: function (who = '') {
return who === this.a ? this.b : who === this.b ? this.a : ''
},
}
await this.reply(msg.from, '_Menunggu partner_', msg, { buttons: [{buttonId: `.leave`, buttonText: {displayText: 'Keluar'}, type: 1}], headerType: 5, footer: author })
}
break
}
}
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

module.exports = handler
