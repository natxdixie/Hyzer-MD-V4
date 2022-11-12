var handler = msg => msg
handler.before = function(msg) {
if (msg.key.remoteJid === 'status@broadcast' && db.data.settings[botNumber].autoread) {
this.readMessages([msg.key]).then(_=> { console.log(`Read Sw : ${msg.name}`) })
}
return !0
}

module.exports = handler 
