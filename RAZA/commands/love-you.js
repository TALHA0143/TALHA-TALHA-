const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "love-you",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "Talha",
    description: "no prefix",
    usePrefix: false,
    commandCategory: "No command marks needed",
    usages: "Yo Yo",
    cooldowns: 5,
};

// सिर्फ एक GIF link
const gif = "https://i.ibb.co/Ng0Hfbff/fef291b4433567c94d9237f20d62ec02.gif";

const messages = [
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n❤️🖤 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 💞🥺💋",
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n❤️🖤 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 💞🥺💋",
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n❤️🖤 𝐋𝐎𝐕𝐄 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 💞🥺💋"
];

module.exports.handleEvent = async function({ api, event, Users }) {
    var { threadID, messageID } = event;
    var name = await Users.getNameUser(event.senderID);

    if (
        event.body.toLowerCase().startsWith("love you") ||
        event.body.toLowerCase().startsWith("i love you") ||
        event.body.toLowerCase().startsWith("love u") ||
        event.body.toLowerCase().startsWith("luv you")
    ) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace("{name}", name);
        const downloadPath = path.join(__dirname, 'love-you-Gif.gif');

        // Download only 1 fixed gif
        request(gif).pipe(fs.createWriteStream(downloadPath)).on('close', () => {
            var msg = {
                body: randomMessage,
                attachment: fs.createReadStream(downloadPath)
            };
            api.sendMessage(msg, threadID, messageID);
            api.setMessageReaction("❤️", event.messageID, (err) => {}, true);
        });
    }
}

module.exports.run = function() {}
