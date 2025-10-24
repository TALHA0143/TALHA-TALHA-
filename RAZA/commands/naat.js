const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "naat",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Talha ✨",
    description: "Send beautiful Naats with poetry",
    commandCategory: "Islamic",
    usages: "naat",
    cooldowns: 5,
};

const naats = [
    { url: "https://files.catbox.moe/cgw7sj.mp3", poetry: "🌹 مصطفیٰ جانِ رحمت پہ لاکھوں سلام\n🌹 شمع بزمِ ہدایت پہ لاکھوں سلام" },
    { url: "https://files.catbox.moe/zo85e6.mp3", poetry: "💚 تیرے صدقے مجھے جینا آیا\n💚 مدینے کا راستہ حسین ہے سایا" },
    { url: "https://files.catbox.moe/k8ij9z.mp3", poetry: "🕌 دل کو مدینے کی ہوا مل جائے\n🕌 کاش مدینہ ہمیں نصیب ہو جائے" },
    { url: "https://files.catbox.moe/65qenm.mp3", poetry: "✨ جس نے مدینے کی گلی دیکھ لی\n✨ اس نے دنیا کی خوشی دیکھ لی" },
    { url: "https://files.catbox.moe/twu4oy.mp3", poetry: "💖 محمد ﷺ کی محبت میری جان ہے\n💖 ان کے عشق میں ہی میری پہچان ہے" },
    { url: "https://files.catbox.moe/h2c3c9.mp3", poetry: "🌙 رات مدینے میں گزر جائے کاش\n🌙 چاند بھی آقا کو دیکھتا رہے خاص" },
    { url: "https://files.catbox.moe/71f6p4.mp3", poetry: "🌸 مدینہ مدینہ مدینہ مدینہ\n🌸 میرا دل تیری طرف کھنچتا ہے" },
    { url: "https://files.catbox.moe/74pscq.mp3", poetry: "💫 آقا کا دیدار نصیب ہو بس\n💫 یہ دنیا و آخرت کی سب سے بڑی خوشی ہے" },
    { url: "https://files.catbox.moe/s0dnvc.mp3", poetry: "🕋 دل کو مدینہ بنانے کی دعا ہے\n🕋 ہر پل آقا ﷺ کو یاد کرنے کی دعا ہے" },
    { url: "https://files.catbox.moe/aiuusn.mp3", poetry: "💎 مصطفیٰ ﷺ کی تعریف سے دل بہلتا ہے\n💎 ان کی یاد سے ہر غم سلگتا ہے" },
    { url: "https://files.catbox.moe/kmn9e1.mp3", poetry: "🌹 تیرے صدقے اے رسولِ خدا ﷺ\n🌹 ہم نے زندگی جینا سیکھا" },
    { url: "https://files.catbox.moe/ba6v6d.mp3", poetry: "💚 مدینے کا مسافر بن جاؤں کاش\n💚 قدم آقا کے شہر میں رکھوں کاش" },
    { url: "https://files.catbox.moe/wixtnm.mp3", poetry: "🕌 تیرے عشق میں ڈوب جاؤں یا رسول ﷺ\n🕌 بس تیرا نام لوں ہر لمحہ" },
    { url: "https://files.catbox.moe/uv4sft.mp3", poetry: "✨ کاش آقا ﷺ کا دیدار ہو\n✨ اور دل میں سکون اتر جائے" },
    { url: "https://files.catbox.moe/mwyl1t.mp3", poetry: "💖 آقا ﷺ کی گلیوں کی خاک بھی نصیب ہو\n💖 اس میں چہرہ رکھ کے سجدہ کروں" },
    { url: "https://files.catbox.moe/abcd17.mp3", poetry: "🌸 تیرے عشق کی خوشبو سے دل مہک جائے\n🌸 یا نبی ﷺ تیرے قدموں میں جھک جائے" },
    { url: "https://files.catbox.moe/10jhh7.mp3", poetry: "💫 آقا ﷺ کی مدح میں وقت کٹ جائے\n💫 اور دل کا سکون بڑھ جائے" },
    { url: "https://files.catbox.moe/tadktq.mp3", poetry: "🕋 تیرے در کا گدا ہوں یا نبی ﷺ\n🕋 تیرے کرم کا طلبگار ہوں" },
    { url: "https://files.catbox.moe/7yshq3.mp3", poetry: "💎 بس مدینہ مدینہ مدینہ سنائی دے\n💎 اور دل خوشی سے جھوم جائے" }
];

module.exports.run = async ({ api, event }) => {
    try {
        const random = naats[Math.floor(Math.random() * naats.length)];
        const filePath = path.join(__dirname, "naat.mp3");

        const response = await axios.get(random.url, { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, Buffer.from(response.data, "utf-8"));

        api.sendMessage({
            body: `📿 𝑵𝒂𝒂𝒕 𝑺𝒉𝒂𝒓𝒊𝒇 📿\n\n${random.poetry}\n\n✨ Recited with Love for Prophet ﷺ\n👑 𝐎𝐰𝐧𝐞𝐫: 𝐓𝐚𝐥𝐡𝐚 𝐏𝐚𝐭𝐡𝐚𝐧 ❤🪽`,
            attachment: fs.createReadStream(filePath)
        }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

    } catch (err) {
        api.sendMessage("❌ Naat send karte waqt masla ho gaya.", event.threadID, event.messageID);
        console.error(err);
    }
};
