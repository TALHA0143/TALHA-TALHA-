module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "💌 M TALHA",
  description: "Report bug of your bot to admin or comment",
  commandCategory: "Admin",
  usages: "[msg]",
  cooldowns: 5,
};

module.exports.handleReply = async function ({ api, args, event, handleReply, Users }) {
  try {
    const name = (await Users.getData(event.senderID)).name;
    const fs = require("fs-extra");
    const { join } = require("path");
    const axios = require("axios");

    const s = [], l = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = 20;

    if (event.attachments?.length) {
      for (const p of event.attachments) {
        let result = '';
        for (let i = 0; i < charactersLength; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        let ext = 'jpg';
        if (p.type === 'video') ext = 'mp4';
        if (p.type === 'audio') ext = 'mp3';
        if (p.type === 'animated_image') ext = 'gif';

        const filepath = join(__dirname, 'cache', `${result}.${ext}`);
        const data = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(filepath, Buffer.from(data, "utf-8"));
        s.push(filepath);
        l.push(fs.createReadStream(filepath));
      }
    }

    switch (handleReply.type) {
      case "reply": {
        const idad = global.config.ADMINBOT;
        for (const ad of idad) {
          const messageData = {
            body: `[📲] Feedback from ${name}:\n[💬] Content: ${event.body || "There's no answer"}`,
            mentions: [{ id: event.senderID, tag: name }],
          };
          if (l.length > 0) messageData.attachment = l;

          api.sendMessage(messageData, ad, (e, data) => {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            });
          });
        }

        for (const file of s) {
          try { fs.unlinkSync(file); } catch (e) { }
        }
        break;
      }

      case "calladmin": {
        const messageBack = {
          body: `[📌] Reply from Admin ${name}:\n\n[💬] ${event.body || "No reply 🌸"}\n\n» Reply again to continue chatting with owner 💌 M TALHA`,
          mentions: [{ tag: name, id: event.senderID }]
        };
        if (l.length > 0) messageBack.attachment = l;

        api.sendMessage(messageBack, handleReply.id, (e, data) => {
          global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          });
        }, handleReply.messID);

        for (const file of s) {
          try { fs.unlinkSync(file); } catch (e) { }
        }
        break;
      }
    }
  } catch (ex) {
    console.log("❌ CALLAD ERROR:", ex);
  }
};

module.exports.run = async function ({ api, event, Threads, args, Users }) {
  try {
    const fs = require("fs-extra");
    const { join } = require("path");
    const axios = require("axios");
    const moment = require("moment-timezone");

    const s = [], l = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = 20;

    if (event.messageReply?.attachments?.length) {
      for (const p of event.messageReply.attachments) {
        let result = '';
        for (let i = 0; i < charactersLength; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        let ext = 'jpg';
        if (p.type === 'video') ext = 'mp4';
        if (p.type === 'audio') ext = 'mp3';
        if (p.type === 'animated_image') ext = 'gif';

        const filepath = join(__dirname, 'cache', `${result}.${ext}`);
        const data = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(filepath, Buffer.from(data, "utf-8"));
        s.push(filepath);
        l.push(fs.createReadStream(filepath));
      }
    }

    if (!args[0] && s.length === 0) {
      return api.sendMessage("❌ You haven't entered anything to report!", event.threadID, event.messageID);
    }

    const name = (await Users.getData(event.senderID)).name;
    const uid = event.senderID;
    const idbox = event.threadID;
    const namethread = (await Threads.getData(event.threadID)).threadInfo.threadName;
    const gio = moment.tz("Asia/Karachi").format("HH:mm:ss D/MM/YYYY");

    const idad = global.config.ADMINBOT;
    api.sendMessage(`📨 Your message has been sent to my owner 💌 M TALHA\n🕒 Time: ${gio}`, event.threadID, () => {
      for (const ad of idad) {
        const messageData = {
          body: `📱 ===[CALL ADMIN]=== 📱\n\n👤 From: ${name}\n🆔 UID: ${uid}\n👥 Group: ${namethread}\n🆔 BOX: ${idbox}\n💬 Message: ${args.join(" ") || "Only media file without text"}\n🕒 Time: ${gio}\n\n🛠️ Reported to Owner: 💌 M TALHA`,
          mentions: [{ id: event.senderID, tag: name }]
        };
        if (l.length > 0) messageData.attachment = l;

        api.sendMessage(messageData, ad, (error, info) => {
          global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            messID: event.messageID,
            id: idbox,
            type: "calladmin"
          });
        });
      }

      for (const file of s) {
        try { fs.unlinkSync(file); } catch (e) { }
      }
    }, event.messageID);
  } catch (ex) {
    console.log("❌ CALLAD RUN ERROR:", ex);
  }
};
