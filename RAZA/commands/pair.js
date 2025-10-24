module.exports.config = {
  name: "pair",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Talha Pathan",
  description: "Pair love 💘",
  commandCategory: "For users",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "jimp": ""
  }
};

async function makeImage({ one, two }) {
  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const axios = global.nodemodule["axios"];
  const jimp = global.nodemodule["jimp"];
  const __root = path.resolve(__dirname, "cache", "canvas");

  if (!fs.existsSync(__root)) fs.mkdirSync(__root, { recursive: true });

  // 👉 Yaha apna template link lagao (1365x768 wali image)
  const pairingImgUrl = "https://i.ibb.co/VYsvHF1s/20250819-183725.jpg"; 
  const baseImagePath = path.join(__root, "pairing_temp.png");

  try {
    const baseImageBuffer = (await axios.get(pairingImgUrl, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(baseImagePath, Buffer.from(baseImageBuffer, 'binary'));
  } catch (error) {
    console.error("Error downloading base image:", error.message);
    throw new Error("Base image download nahi ho payi ❌");
  }

  let pairing_img = await jimp.read(baseImagePath);
  let pathImg = path.join(__root, `pairing${one}${two}.png`);
  let avatarOne = path.join(__root, `avt${one}.png`);
  let avatarTwo = path.join(__root, `avt${two}.png`);

  // 👉 Avatar download karna
  const downloadAvatar = async (id, filePath) => {
    try {
      let buffer = (await axios.get(
        `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: 'arraybuffer' }
      )).data;
      fs.writeFileSync(filePath, Buffer.from(buffer, 'binary'));
    } catch (error) {
      console.error(`Avatar download error (user ${id}):`, error.message);
      throw new Error(`Avatar ${id} ka download fail ❌`);
    }
  };

  await downloadAvatar(one, avatarOne);
  await downloadAvatar(two, avatarTwo);

  let circleOne = await jimp.read(await circle(avatarOne));
  let circleTwo = await jimp.read(await circle(avatarTwo));

  // 🔥 FIXED size & position - dono DPs circle ke andar fit ho jayengi
  pairing_img
    .composite(circleOne.resize(175, 175), 43, 98)  // Left side circle
    .composite(circleTwo.resize(175, 175), 419, 92); // Right side circle

  let raw = await pairing_img.getBufferAsync("image/png");
  fs.writeFileSync(pathImg, raw);

  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);
  fs.unlinkSync(baseImagePath);

  return pathImg;
}

async function circle(image) {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID } = event;
  const fs = require("fs-extra");

  const tl = ['21%', '11%', '55%', '89%', '22%', '45%', '1%', '4%', '78%', '15%', '91%', '77%', '41%', '32%', '67%', '19%', '37%', '17%', '96%', '52%', '62%', '76%', '83%', '100%', '99%', "0%", "48%"];
  const tle = tl[Math.floor(Math.random() * tl.length)];

  try {
    const userInfo = await api.getUserInfo(senderID);
    const namee = userInfo[senderID].name;
    const senderGender = userInfo[senderID].gender;

    const threadInfo = await api.getThreadInfo(threadID);
    let participantIDs = threadInfo.participantIDs.filter(id => id !== senderID);

    if (participantIDs.length === 0) {
      return api.sendMessage("Group me aur koi member hi nahi mila pairing ke liye 🤷‍♂️", threadID, messageID);
    }

    const participantsInfo = await api.getUserInfo(participantIDs);

    let oppositeGenderIDs = [];
    if (senderGender === 2) {
      oppositeGenderIDs = participantIDs.filter(id => participantsInfo[id]?.gender === 1);
    } else if (senderGender === 1) {
      oppositeGenderIDs = participantIDs.filter(id => participantsInfo[id]?.gender === 2);
    } else {
      oppositeGenderIDs = participantIDs;
    }

    let randomID;
    if (oppositeGenderIDs.length > 0) {
      randomID = oppositeGenderIDs[Math.floor(Math.random() * oppositeGenderIDs.length)];
    } else {
      randomID = participantIDs[Math.floor(Math.random() * participantIDs.length)];
    }

    const partnerInfo = await api.getUserInfo(randomID);
    const name = partnerInfo[randomID].name;

    const arraytag = [
      { id: senderID, tag: namee },
      { id: randomID, tag: name }
    ];

    const one = senderID, two = randomID;

    return makeImage({ one, two }).then(path =>
      api.sendMessage({
        body: `‎𝐎𝐰𝐧𝐞𝐫 ➻ 🌹 𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 🌹

⎯ⷨ͢⟵͇̽💗⃪꯭ⷯ༆⁂𝄄❘⍣ . . 𝐀𝐧𝐤𝐡𝐨 𝐦𝐞 𝐛𝐚𝐬𝐚𝐥𝐮 𝐭𝐮𝐣𝐡𝐤𝐨 ..
𝐒𝐡𝐞𝐞𝐬𝐡𝐞 𝐦𝐞 𝐭𝐞𝐫𝐚𝐝𝐞𝐞𝐝𝐚𝐫 𝐡𝐨 ..
𝐀𝐤 𝐰𝐚𝐪𝐭 𝐞𝐬𝐚 𝐚𝐲𝐞 𝐣𝐢𝐧𝐝𝐠𝐢 𝐦𝐞 ..
𝐭𝐮𝐣𝐡𝐤𝐨 𝐯 𝐡𝐮𝐦𝐬𝐞 𝐩𝐲𝐚𝐫 𝐡𝐨 ..

⎯᪵⎯꯭̽𝆺꯭𝅥

➻ 𝐍𝗔ɱɘ ✦ ${namee}
➻ 𝐍𝗔ɱɘ ✦ ${name}

🌸🍁The odds are: 〘${tle}%`,
        mentions: arraytag,
        attachment: fs.createReadStream(path)
      }, threadID, () => fs.unlinkSync(path), messageID)
    );

  } catch (error) {
    console.error("Pair command error:", error.message);
    return api.sendMessage("Error aaya pairing me ❌ Baad me try karo!", threadID, messageID);
  }
};
