var handler = msg => msg
handler.before = async function (msg) {
if (msg.message && !msg.isCommand) {
this.menfess = this.menfess ? this.menfess : {}
if (this.menfess[msg.sender].id != 0 && msg.quoted.footerText == '_Menfess - Whatsapp Bot_') {
var txt =  `🚩 Hi kamu mendapatkan balasan menfess dari @${msg.sender.split('@')[0]}\n\n*Isi Balasan :* ${msg.text}`.trim()
this.reply(this.menfess[msg.sender].dari, txt, null, { mentions: this.parseMention(txt) })
this.reply(msg.from, "🚩 Berhasil mengirim balasan.", msg)
await Func.sleep(750)
delete this.menfess[msg.sender]
}
}
return !0
}

module.exports = handler
