const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "help",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "Talha ✨",
  description: "Stylish help menu with DP and royal design",
  commandCategory: "system",
  usages: "help [page]",
  cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
  const allCommands = Array.from(global.client.commands.values());

  const page = parseInt(args[0]) || 1;
  const commandsPerPage = 10;
  const totalPages = Math.ceil(allCommands.length / commandsPerPage);
  const start = (page - 1) * commandsPerPage;
  const end = start + commandsPerPage;

  if (page < 1 || page > totalPages) {
    return api.sendMessage(`❌ Page not found. Total pages: ${totalPages}`, event.threadID);
  }

  const pageCommands = allCommands.slice(start, end);

  // Commands list in ➥ format
  const commandInfo = pageCommands
    .map((cmd) => `├─➥ ${cmd.config.name}`)
    .join("\n");

  // DP URL
  const imgUrl = ""; // apna DP URL lagao
  const pathImg = __dirname + "/help.jpg";

  const writeImg = () => new Promise((resolve, reject) => {
    request(encodeURI(imgUrl))
      .pipe(fs.createWriteStream(pathImg))
      .on("close", () => resolve())
      .on("error", (err) => reject(err));
  });

  const header = `╔══════✦✿✦═══════╗
       🄷🄴🄻🄿 🄼🄴🄽🅄
╚══════✦✿✦═══════╝

♚ ━━━━━━━━━━━━━━━━━━━ ♛
    ➢  🅾🆆🅽🅴🆁 🆃🅰🅻🅷🅰 
♛ ━━━━━━━━━━━━━━━━━━━ ♚
• ɴᴀᴍᴇ     ➝ ᴠɪᴘ✮𝕜𝕚𝕟𝕘  
• ᴏᴡɴᴇʀ    ➝ ᴍ ᴛᴀʟʜᴀ (ᴠᴇʀɪғɪᴇᴅ)  
• ᴜᴘᴛɪᴍᴇ   ➝ ${process.uptime().toFixed(0)}s  
• ᴅᴀᴛᴇ     ➝ ${new Date().toLocaleDateString()}

✧･ﾟ: *✧･ﾟ:* 🎀 *:･ﾟ✧*:･ﾟ✧
  🅲🅾🅼🅼🅰🅽🅳 🅻🅸🆂🆃
✧･ﾟ: *✧･ﾟ:* 🎀 *:･ﾟ✧*:･ﾟ✧`;

  const footer = `\n╔════════✦❀✦════════╗
   🄻🄾🅅🄴 🄵🅁🄾🄼 🄾🅆🄽🄴🅁
╚════════✦❀✦════════╝
✨ ᴛʜɪs ʙᴏᴛ ɪs ᴍᴀᴅᴇ ᴡɪᴛʜ ʟᴏᴠᴇ
🌹 sᴘʀᴇᴀᴅ ʟᴏᴠᴇ ᴇᴠᴇʀʏᴡʜᴇʀᴇ
📌 ᴘᴀɢᴇ ${page}/${totalPages}`;

  try {
    await writeImg();
    api.sendMessage({
      body: `${header}\n\n${commandInfo}\n${footer}`,
      attachment: fs.createReadStream(pathImg)
    }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
  } catch (error) {
    api.sendMessage(`${header}\n\n${commandInfo}\n${footer}`, event.threadID, event.messageID);
  }
};
