var handler = async(msg, { 
client 
}) => {
var sendOwner = await client.sendContact(msg.from, Info.owner, msg)
var teks = `*🚩 Hi kak @${msg.sender.split('@')[0]} ini adalah kontak creator kami, kami tidak akan menanggapi hal yang tidak penting.*`
client.sendMessage(msg.from, { text: teks, mentions: client.parseMention(teks)}, { quoted:sendOwner })
}
handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

module.exports = handler
