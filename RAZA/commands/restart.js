module.exports.config = {
  name: "restart",
  version: "1.0.1",
  hasPermssion: 2,
  credits: "💌 M TALHA",
  description: "Restart the bot in a stylish way",
  commandCategory: "System",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const { threadID } = event;
  const botName = global.config.BOTNAME || "⚡ 𝙈𝙔 𝘽𝙊𝙏 ⚡";

  const message = `
╭━━━◆🔁◆━━━╮
  𝗥𝗘𝗕𝗢𝗢𝗧 𝗣𝗥𝗢𝗖𝗘𝗦𝗦
╰━━━◆🔁◆━━━╯

⚙️ | 𝗦𝘆𝘀𝘁𝗲𝗺: ${botName}  
💫 | 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴...  
🕐 | 𝗧𝗶𝗺𝗲: ${new Date().toLocaleTimeString()}  
💭 | “𝘎𝘪𝘷𝘪𝘯𝘨 𝘮𝘺 𝘤𝘪𝘳𝘤𝘶𝘪𝘵𝘴 𝘢 𝘴𝘩𝘰𝘳𝘵 𝘯𝘢𝘱 😴”

━━━━━━━━━━━━━━━━━━━
👑 𝗢𝘄𝗻𝗲𝗿: 𝗠 𝗧𝗔𝗟𝗛𝗔  
🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: facebook.com/100065216344877
━━━━━━━━━━━━━━━━━━━

💥 𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁...  
𝗜’𝗹𝗹 𝗿𝗲𝗯𝗼𝗼𝘁 𝗶𝗻 𝗮 𝗳𝗲𝘄 𝘀𝗲𝗰𝗼𝗻𝗱𝘀 🚀
`;

  api.sendMessage(message, threadID, () => process.exit(1));
};
