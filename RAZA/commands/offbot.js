module.exports.config = {
  name: "offbot",
  version: "3.5.0",
  hasPermssion: 2,
  credits: "M TALHA",
  description: "Turn the bot off in stylish mode",
  commandCategory: "System",
  cooldowns: 0
};

module.exports.run = ({ event, api }) => {
  const permission = ["100065216344877"]; // Add your UID here
  if (!permission.includes(event.senderID)) {
    return api.sendMessage(
      "🚫 𝗔𝗰𝗰𝗲𝘀𝘀 𝗗𝗲𝗻𝗶𝗲𝗱!\n\n❌ Only the Owner — 𝗠 𝗧𝗔𝗟𝗛𝗔 — can shut down this bot.",
      event.threadID,
      event.messageID
    );
  }

  const botName = global.config.BOTNAME || "⚡ 𝗠 𝗧𝗔𝗟𝗛𝗔 𝗕𝗢𝗧 ⚡";

  const message = `
╭━━━💀━━━╮
   𝗦𝗬𝗦𝗧𝗘𝗠 𝗢𝗙𝗙𝗟𝗜𝗡𝗘
╰━━━💀━━━╯

⚡ *Bot:* ${botName}
🌘 *Mode:* OFFLINE HEHEHE 
🕛 *Time:* ${new Date().toLocaleTimeString()}
💤 *Status:* Power Off Initializing...

╭─✦─ Owner ─✦─╮
👑 𝗠 𝗧𝗔𝗟𝗛𝗔  
🌐 https://www.facebook.com/broken019876
╰──────────────╯

⚔️ “Silence activated... chaos sleeps.” 🌑
`;

  api.sendMessage(message, event.threadID, () => process.exit(0));
};
