var handler = msg => msg
handler.before = async function (msg) {
if (!msg.from.endsWith('@s.whatsapp.net'))
return !0
this.anonymous = this.anonymous ? this.anonymous : {}
let room = Object.values(this.anonymous).find(room => [room.a, room.b].includes(msg.sender) && room.state === 'CHATTING')
if (room) {
if (/^.*(next|leave|start)/.test(msg.text))
return
let other = [room.a, room.b].find(user => user !== msg.sender)
await msg.copyNForward(other, true)
}
return !0
}
