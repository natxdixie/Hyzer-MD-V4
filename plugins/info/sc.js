const handler = async (msg, { client }) => {
msg.reply("https://github.com/Hyzerr/Hyzer-MD-V4\n\n*[❗] Don\'t forget to fork and give star this repo.*")
}
handler.tags = ['info']
handler.help = ['sc']
handler.command = /^(sc)$/i

module.exports = handler
