module.exports.config = {
  name: "prefix",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "💌 M TALHA",
  description: "Display bot prefix and owner info in stylish format",
  commandCategory: "Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  const { threadID, messageID, body } = event;

  // Credits protection
  if (this.config.credits !== "💌 M TALHA") {
    return api.sendMessage(`⚠️ Credit change detected! Please restore credits to 💌 M TALHA`, threadID, messageID);
  }

  function send(msg) {
    api.sendMessage(msg, threadID, messageID);
  }

  const dataThread = await Threads.getData(threadID);
  const data = dataThread?.data || {};
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  const keywords = [
    "prefix", "mprefix", "bot prefix", "daulenh", "what prefix", "bot dead",
    "bot offline", "where prefix", "how to use bot", "perfix", "prfix", "prefx"
  ];

  for (let keyword of keywords) {
    const str = keyword.charAt(0).toUpperCase() + keyword.slice(1);
    if (body === keyword || body === keyword.toUpperCase() || body === str) {
      return send(
`╭━━━⟢🔮⟣━━━╮
     ⚡ 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎 ⚡
╰━━━⟢🔮⟣━━━╯

┏━━━━━━━━━━━━━━┓
🔹 𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫: [ ${prefix} ]
🔹 𝗢𝗪𝗡𝗘𝗥: 𝗠 𝗧𝗔𝗟𝗛𝗔
🔹 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: facebook.com/share/193GypVyJQ
┗━━━━━━━━━━━━━━┛

✨ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝗡𝗙𝗢:
   ⚙️ 𝗠𝗼𝗱𝗲: 𝗔𝘂𝘁𝗼 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲  
   💡 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗔𝗰𝘁𝗶𝘃𝗲 𝗮𝗻𝗱 𝗢𝗻𝗹𝗶𝗻𝗲  
   🧠 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲: 𝘼𝙞 𝙅𝙖𝙫𝙖 𝙇𝙤𝙜𝙞𝙘  

━━━━━━━━━━━━━━━━━━━
💙 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗠 𝗧𝗔𝗟𝗛𝗔 𝗕𝗢𝗧  
🚀 𝗦𝘁𝗮𝘆 𝗦𝗺𝗮𝗿𝘁 • 𝗦𝘁𝗮𝘆 𝗦𝗮𝗳𝗲 • 𝗦𝗽𝗿𝗲𝗮𝗱 𝗟𝗼𝘃𝗲 💫
━━━━━━━━━━━━━━━━━━━`
      );
    }
  }
};

module.exports.run = async ({ event, api, Threads }) => {
  const { threadID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;

  return api.sendMessage(
`╭━━━⟢🔮⟣━━━╮
     ⚡ 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎 ⚡
╰━━━⟢🔮⟣━━━╯

┏━━━━━━━━━━━━━━┓
🔹 𝗕𝗢𝗧 𝗣𝗥𝗘𝗙𝗜𝗫: [ ${prefix} ]
🔹 𝗢𝗪𝗡𝗘𝗥: 𝗠 𝗧𝗔𝗟𝗛𝗔
🔹 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: facebook.com/share/193GypVyJQ
┗━━━━━━━━━━━━━━┛

✨ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗜𝗡𝗙𝗢:
   ⚙️ 𝗠𝗼𝗱𝗲: 𝗔𝘂𝘁𝗼 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲  
   💡 𝗦𝘁𝗮𝘁𝘂𝘀: 𝗔𝗰𝘁𝗶𝘃𝗲 𝗮𝗻𝗱 𝗢𝗻𝗹𝗶𝗻𝗲  
   🧠 𝗜𝗻𝘁𝗲𝗹𝗹𝗶𝗴𝗲𝗻𝗰𝗲: 𝘼𝙞 𝙅𝙖𝙫𝙖 𝙇𝙤𝙜𝙞𝙘  

━━━━━━━━━━━━━━━━━━━
💙 𝗧𝗵𝗮𝗻𝗸𝘀 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗠 𝗧𝗔𝗟𝗛𝗔 𝗕𝗢𝗧  
🚀 𝗦𝘁𝗮𝘆 𝗦𝗺𝗮𝗿𝘁 • 𝗦𝘁𝗮𝘆 𝗦𝗮𝗳𝗲 • 𝗦𝗽𝗿𝗲𝗮𝗱 𝗟𝗼𝘃𝗲 💫
━━━━━━━━━━━━━━━━━━━`, threadID
  );
};
