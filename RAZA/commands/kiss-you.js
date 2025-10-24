const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "kiss-you",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Talha",
    description: "no prefix",
    usePrefix: false,
    commandCategory: "No command marks needed",
    usages: "Yo Yo",
    cooldowns: 5,
};

// नया GIF link (kiss wala gif yaha daalna hai 👇)
const gif = "https://i.ibb.co/Xrpzkpyt/90c2c7a3a1396f43b4279e520be3c79d.gif";

const messages = [
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n💋❤️ 𝐊𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 😘🥺",
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n💋❤️ 𝐊𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 😘🥺",
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n💋❤️ 𝐊𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 😘🥺"
];

module.exports.handleEvent = async function({ api, event, Users }) {
    var { threadID, messageID } = event;
    var name = await Users.getNameUser(event.senderID);

    if (
        event.body.toLowerCase().startsWith("kiss you") ||
        event.body.toLowerCase().startsWith("i kiss you") ||
        event.body.toLowerCase().startsWith("kiss u")
    ) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace("{name}", name);
        const downloadPath = path.join(__dirname, 'kiss-you-Gif.gif');

        // Download only 1 fixed gif
        request(gif).pipe(fs.createWriteStream(downloadPath)).on('close', () => {
            var msg = {
                body: randomMessage,
                attachment: fs.createReadStream(downloadPath)
            };
            api.sendMessage(msg, threadID, messageID);
            api.setMessageReaction("💋", event.messageID, (err) => {}, true);
        });
    }
}

module.exports.run = function() {}
