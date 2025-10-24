const request = require('request');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "miss-you",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Talha",
    description: "no prefix",
    usePrefix: false,
    commandCategory: "No command marks needed",
    usages: "Yo Yo",
    cooldowns: 5,
};

// नया GIF link
const gif = "https://i.ibb.co/4RhWQCSV/23d531f915dfa00d7c7c9c3ac15b997a.gif";

const messages = [
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n💞🥺 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 ❤️💋",
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n💞🥺 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 ❤️💋",
    "=𝐎𝐰𝐧𝐞𝐫 ➻  𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 \n──────────────────\n\n💞🥺 𝐌𝐈𝐒𝐒 𝐘𝐎𝐔 𝐓𝐎𝐎 𝐉𝐀𝐍 𝐌𝐄𝐑𝐈 ❤️💋"
];

module.exports.handleEvent = async function({ api, event, Users }) {
    var { threadID, messageID } = event;
    var name = await Users.getNameUser(event.senderID);

    if (
        event.body.toLowerCase().startsWith("miss you") ||
        event.body.toLowerCase().startsWith("i miss you") ||
        event.body.toLowerCase().startsWith("miss u")
    ) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)].replace("{name}", name);
        const downloadPath = path.join(__dirname, 'miss-you-Gif.gif');

        // Download only 1 fixed gif
        request(gif).pipe(fs.createWriteStream(downloadPath)).on('close', () => {
            var msg = {
                body: randomMessage,
                attachment: fs.createReadStream(downloadPath)
            };
            api.sendMessage(msg, threadID, messageID);
            api.setMessageReaction("🥺", event.messageID, (err) => {}, true);
        });
    }
}

module.exports.run = function() {}
