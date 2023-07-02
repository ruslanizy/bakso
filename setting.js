const chalk = require("chalk")
const fs = require("fs")

global.ownerNama = "SanXd"
global.botNama = "SanBot"
global.ownerNomer = ["6285793433348"]
global.thumb = fs.readFileSync("./basexd/gambar/thumb.jpg")

global.jumlahbugtext = "35"
global.jumlahbugemoji = "30"

global.mess = {
  succes: 'Done', 
  group: 'Hanya Bisa Di Gunakan Di Group', 
  botAdmin: 'Jadiin Bot Admin Dong Biar Bisa', 
  admin: 'Fitur Khusus Admin', 
  bot: 'Fitur Khusus Nomer Bot', 
  owner: 'Fitur Khusus Owner', 
  wait: 'Loading...', 
  error: 'Fitur Sedang Eror', 
  prem: 'Fitur Khusus User Premium', 
} 

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.greenBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})