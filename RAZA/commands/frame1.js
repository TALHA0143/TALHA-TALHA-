module.exports.config = {
    name: "frame1",
    version: "7.3.2",
    hasPermssion: 0,
    credits: "Fix by M TALHA", 
    description: "Apply custom frame to user's DP",
    commandCategory: "img",
    usages: "[@mention]",
    cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": "",
        "path": "",
        "jimp": ""
    }
};

module.exports.onLoad = async () => {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;

    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'frame1.png'); 
    if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true });

    // 👇 yahan apna frame ka PNG/JPG link dal do
    if (!existsSync(path)) 
        await downloadFile("https://i.ibb.co/GvTmPGQT/20250824-073244.jpg", path);
};

async function makeImage(uid) {
    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
    const axios = global.nodemodule["axios"]; 
    const jimp = global.nodemodule["jimp"];
    const __root = path.resolve(__dirname, "cache", "canvas");

    // Base frame
    let frame_img = await jimp.read(__root + "/frame1.png");
    let pathImg = __root + `/frame_${uid}.png`;

    // Avatar download
    let avatarPath = __root + `/avt_${uid}.png`;
    let getAvatar = (await axios.get(
        `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: 'arraybuffer' }
    )).data;
    fs.writeFileSync(avatarPath, Buffer.from(getAvatar, 'utf-8'));

    // Circle crop
    let circleAvt = await jimp.read(await circle(avatarPath));

    // 👇 yahan size aur position adjust karna hoga frame ke hisaab se
    frame_img.composite(circleAvt.resize(490, 490), 80, 80);  

    let raw = await frame_img.getBufferAsync("image/png");
    fs.writeFileSync(pathImg, raw);

    // delete temp avatar
    fs.unlinkSync(avatarPath);

    return pathImg;
}

async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api }) {    
    const fs = global.nodemodule["fs-extra"];
    const { threadID, messageID, senderID } = event;
    const mention = Object.keys(event.mentions);

    let uid = mention[0] ? mention[0] : senderID;

    return makeImage(uid).then(path => 
        api.sendMessage(
            { body: `╔═══❖••° °••❖═══╗

      𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 𝐅𝐫𝐚𝐦𝐞

╚═══❖••° °••❖═══╝

✶⊶⊷⊷❍⊶⊷⊷✶

         👑 𝐘𝐄 𝐋𝐎 𝐁𝐀𝐍 𝐆𝐘𝐀

𝐓𝐑𝐀 𝐅𝐑𝐀𝐌𝐄 ❤


✶⊶⊷⊷❍⊶⊷⊷✶`, attachment: fs.createReadStream(path) }, 
            threadID, 
            () => fs.unlinkSync(path), 
            messageID
        )
    );
};
