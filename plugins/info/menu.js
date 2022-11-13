let { generateWAMessageFromContent, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys')
let moment = require('moment-timezone')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let levelling = require('../../system/levelling')
let spa = '    '
let tags = {
  'dl': 'DOWNLOADER',
  'group': 'GROUP',
  'info': 'INFO',
  'owner': 'OWNER',
  'anime': 'ANIME',
  'tools': 'TOOLS',
  'random': 'RANDOM',
  'web': 'INTERNET',
  'rpg': 'RPG',
  'anonymous': 'ANONYMOUS',
  'nsfw': 'NSFW',
}
const defaultMenu = {
  before: `*${Func.ucapan()}, ${Info.botName} Here*\n`,
  header: '*%category*',
  body: spa + '› %cmd %islimit %isPremium',
  footer: '',
  after: ``,
}
let handler = async (msg, { client, usedPrefix: _p }) => {
  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../../package.json')).catch(_ => '{}'))
    let who
    if (msg.isGroup) who = msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.sender
    else who = msg.sender 
    let user = global.db.data.users[who]
    let { exp, limit, level, money, role } = global.db.data.users[msg.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = client.getName(msg.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = Func.clockString(_muptime)
    let uptime = Func.clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    client.menu = client.menu ? client.menu : {}
    let before = client.menu.before || defaultMenu.before
    let header = client.menu.header || defaultMenu.header
    let body = client.menu.body || defaultMenu.body
    let footer = client.menu.footer || defaultMenu.footer
    let after = client.menu.after || (client.user.jid == global.client.user.jid ? '' : `Powered by https://wa.me/${global.client.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? ' ' : '')
                .replace(/%isPremium/g, menu.premium ? ' ' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof client.menu == 'string' ? client.menu : typeof client.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: client.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, money, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    var buffer = await Func.resize(fs.readFileSync('./global/media/me.jpg'), 300, 150)
    client.sendImage(msg.from, buffer, text, msg, { asLocation: true, buttons: [{buttonId: `.owner`, buttonText: {displayText: 'Owner 🐾'}, type: 1}, {buttonId: `.db`, buttonText: {displayText: 'Dashboard 🌐'}, type: 1}], headerType: 4, footer: Info.botWm })
    } catch (e) {
    client.reply(msg.from, 'Maaf, menu sedang error', msg)
    throw e
  }
}
handler.command = /^(menu)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
