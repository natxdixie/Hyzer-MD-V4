const handler = async (msg, { client, command }) => {
msg.reply(Func.pickJson(`./system/database/quotes/${command}.json`))
}
handler.tags = ['random']
handler.help = ['bacot','bucin','galau','gombal','motivasi','ngawur','pantun','quote-ilmuan','quotes','quotesanime','sadquotes']
handler.command = /^(bacot|bucin|galau|gombal|motivasi|ngawur|pantun|quote-ilmuan|quotes|quotesanime|sadquotes)$/i

module.exports = handler