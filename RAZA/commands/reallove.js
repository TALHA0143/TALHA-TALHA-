module.exports.config = {
  name: "reallove",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modified by Talha",
  description: "Find your other half in a stylish way",
  commandCategory: "fun",
  usages: "[boy/girl]",
  cooldowns: 15
};

module.exports.run = async ({ api, event, args, Users }) => {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];

  // thread info
  var ThreadInfo = await api.getThreadInfo(event.threadID);
  var all = ThreadInfo.userInfo;
  let data = [];

  // filter logic
  if (!args[0]) {
    for (let u of all) {
      if (u.gender != undefined && u.id != event.senderID) data.push(u.id);
    }
  } else if (args[0] == "boy") {
    for (let u of all) {
      if (u.gender == "MALE" && u.id != event.senderID) data.push(u.id);
    }
  } else if (args[0] == "girl") {
    for (let u of all) {
      if (u.gender == "FEMALE" && u.id != event.senderID) data.push(u.id);
    }
  }

  if (data.length == 0) return api.sendMessage("❌ Regret! Can't find your half-life 😭", event.threadID, event.messageID);

  // random match
  let e = data[Math.floor(Math.random() * data.length)];
  let percent = (Math.random() * 50) + 50;

  // names
  var senderName = (await Users.getData(event.senderID)).name;
  var matchName = (await Users.getData(e)).name;

  // avatar
  let getAvatar = (await axios.get(`https://graph.facebook.com/${e}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(getAvatar, "utf-8"));

  // message body with Ribbon Style
  let msg = 
`╭─🎀───♡─────🎀─╮
     💖 Lovely Pair 💖
╰─🎀───♡─────🎀─╯

━━━━━━━━━━━━━━━

👤 You: ${senderName}  
💘 Match: ${matchName}  

━━━━━━━━━━━━━━━

💟 Status: Single 🥰  
💞 Love Bond: ${percent.toFixed(2)}% 💝  

━━━━━━━━━━━━━━━

🆔 FB ID: ${e}  
🔗 Link: m.facebook.com/${e}  

━━━━━━━━━━━━━━━

🎀 “Two hearts tied with a ribbon of fate 💌”`;

  // send
  api.sendMessage({
    body: msg,
    attachment: fs.createReadStream(__dirname + `/cache/avt.png`)
  }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/avt.png`), event.messageID);
};
