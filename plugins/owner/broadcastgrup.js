var handler = async (msg, { 
text 
}) => {
var delay = time => new Promise(res => setTimeout(res, time))
var getGroups = await client.groupFetchAllParticipating()
var groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
var anu = groups.map(v => v.id)
var pesan = msg.quoted && msg.quoted.text ? msg.quoted.text : text
if (!pesan) return msg.reply('🚩 Reply/Masukkan teksnya')
msg.reply(`🚩 Mengirim Broadcast Ke ${anu.length} Chat, Waktu Selesai ${anu.length * 0.5} detik`)
for (let i of anu) {
await delay(500)
client.reply(i, pesan, null)
}
msg.reply(`🚩 Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
handler.help = ['bcgc <teks>']
handler.tags = ['owner']
handler.command = /^(broadcastgc|bcgc)$/i

handler.owner = true

module.exports = handler
