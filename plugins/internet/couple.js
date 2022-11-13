var handler = async(msg, { 
client
}) => {
var res = await Func.pickJson('./system/database/anime/couple.json')
client.sendImage(msg.from, res.male, 'Cowo.', msg, { isUrl: true })
client.sendImage(msg.from, res.female, 'Cewe.', msg, { isUrl: true })
}
handler.help = ['ppcouple','couple']
handler.tags = ['web']
handler.command = /^(ppcp|ppcouple|couple)$/i

module.exports = handler
