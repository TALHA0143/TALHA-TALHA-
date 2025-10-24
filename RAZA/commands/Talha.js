const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "owner",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "Talha pathan",
  description: "No prefix Stylish Owner Card",
  commandCategory: "No command marks needed",
  usages: "...",
  cooldowns: 5,
};

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body) return;

  const react = body.toLowerCase();
  if (
    react.includes("owner") ||
    react.includes("broken") ||
    react.includes("Owner") ||
    react.includes("OWNER") ||
    react.includes("— 𝐁ɼ๏ʞɛ𝗻 ː͢") 
  ) {
    const imageUrl = "https://i.ibb.co/SwfxpTcv/0eee0ae95221453b7bf1336bdd5fb15e.jpg"; // apna DP link daalna
    const imgPath = path.join(__dirname, "cache", "owner.jpg");

    try {
      const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
      fs.ensureDirSync(path.dirname(imgPath));
      fs.writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));

      const msg = {
        body: `
┏━━━━━━━━━━━━━━━┓
       🔰  𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢  🔰
┗━━━━━━━━━━━━━━━┛

🩶 𝗢𝘄𝗻𝗲𝗿 ➻ 𝐓𝐚𝐥𝐡𝐚 🩶🪽
🩶 𝗔𝗴𝗲 : 𝟐𝟏
🩶 𝗙𝗿𝗼𝗺 : 𝐤𝐏𝐤 - 𝐏𝐞𝐬𝐡𝐰𝐞𝐫
🩶 𝗦𝘁𝘂𝗱𝘆 : 𝐈 𝐇𝐚𝐭𝐞 𝐒𝐭𝐮𝐝𝐲 🫡🫵

🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 : 
[ https://www.facebook.com/share/193GypVyJQ/ ]

📞 𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽 : 𝐒𝐄𝐂𝐑𝐄𝐓 𝐇𝐀𝐈 𝐁𝐎𝐒𝐒

💚 "𝐈𝐧𝐭𝐞𝐳𝐚𝐫 𝐡𝐮𝐦𝐞𝐬𝐡𝐚 𝐤𝐚𝐫𝐮 𝐠𝐚 𝐥𝐞𝐤𝐢𝐧 𝐚𝐚𝐰𝐚𝐳 𝐧𝐚𝐡𝐢 𝐝𝐮𝐧𝐠𝐚,
𝐬𝐡𝐚𝐲𝐚𝐫𝐢 𝐥𝐢𝐤𝐡𝐮 𝐠𝐚 𝐭𝐞𝐫𝐞 𝐧𝐚𝐚𝐦 𝐩𝐚𝐫,
𝐥𝐞𝐤𝐢𝐧 𝐭𝐞𝐫𝐚 𝐧𝐚𝐚𝐦 𝐧𝐚𝐡𝐢 𝐥𝐮𝐧𝐆𝐚..." 🥺
`,
        attachment: fs.createReadStream(imgPath)
      };

      api.sendMessage(msg, threadID, () => {
        fs.unlinkSync(imgPath);
      });

      api.setMessageReaction("🥀", messageID, () => {}, true);
    } catch (err) {
      console.error("Image send error:", err);
    }
  }
};

module.exports.run = function () {};
