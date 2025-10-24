const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "dua",
    version: "3.0",
    hasPermssion: 0,
    credits: "Talha Pathan",
    description: "Islamic duas with Arabic text and Urdu/English translations",
    commandCategory: "islamic",
    usages: "[topic]",
    cooldowns: 5
};

// 30 Authentic Duas Database
const DUA_DB = [
    {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        urdu: "اے ہمارے رب! ہمیں دنیا میں بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا",
        english: "Our Lord! Give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire",
        reference: "Surah Al-Baqarah 2:201"
    },
    {
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        urdu: "اے میرے رب! میرے سینے کو کشادہ کر دے اور میرے کام کو آسان کر دے",
        english: "My Lord! Expand my breast for me and make my task easy for me",
        reference: "Surah Taha 20:25-28"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        urdu: "اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ رزق اور قابل قبول عمل کی دعا کرتا ہوں",
        english: "O Allah! I ask You for beneficial knowledge, good provision and acceptable deeds",
        reference: "Ibn Majah"
    },
    {
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
        urdu: "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں",
        english: "O Allah! You are my Lord, there is no god but You. You created me and I am Your servant",
        reference: "Morning/Evening Adhkar"
    },
    {
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        urdu: "اے میرے رب! میرے علم میں اضافہ فرما",
        english: "My Lord! Increase me in knowledge",
        reference: "Surah Taha 20:114"
    },
    {
        arabic: "رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً",
        urdu: "اے میرے رب! مجھے اپنی جانب سے نیک اولاد عطا فرما",
        english: "My Lord! Grant me from Yourself a good offspring",
        reference: "Surah Aal-e-Imran 3:38"
    },
    {
        arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
        urdu: "اے میرے رب! مجھے اور میرے والدین کو بخش دے",
        english: "My Lord! Forgive me and my parents",
        reference: "Surah Ibrahim 14:41"
    },
    {
        arabic: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ",
        urdu: "اے اللہ! میرے تمام گناہ معاف فرما چھوٹے بھی اور بڑے بھی",
        english: "O Allah! Forgive all my sins, the small and the great",
        reference: "Muslim"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
        urdu: "اے اللہ! میں تجھ سے جنت مانگتا ہوں اور جہنم سے پناہ چاہتا ہوں",
        english: "O Allah! I ask You for Paradise and seek refuge in You from the Fire",
        reference: "Abu Dawood"
    },
    {
        arabic: "اللَّهُمَّ ثَبِّتْنِي وَاجْعَلْنِي هَادِيًا مَهْدِيًّا",
        urdu: "اے اللہ! مجھے ثابت قدم رکھ اور مجھے ہدایت یافتہ اور ہدایت دینے والا بنا",
        english: "O Allah! Keep me firm and make me a rightly guided guide",
        reference: "Tirmidhi"
    },
    {
        arabic: "اللَّهُمَّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي",
        urdu: "اے اللہ! مجھے اور میری اولاد کو نماز قائم کرنے والا بنا",
        english: "O Allah! Make me and my descendants among those who establish prayer",
        reference: "Surah Ibrahim 14:40"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا",
        urdu: "اے اللہ! میں نے اپنے نفس پر بہت ظلم کیا ہے",
        english: "O Allah! I have wronged myself greatly",
        reference: "Bukhari & Muslim"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ",
        urdu: "اے اللہ! میں تیری نعمت کے زوال سے پناہ مانگتا ہوں",
        english: "O Allah! I seek refuge in You from the decline of Your blessings",
        reference: "Muslim"
    },
    {
        arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا",
        urdu: "اے ہمارے رب! ہم نے اپنی جانوں پر ظلم کیا، اگر تو ہمیں نہ بخشے تو ہم خسارہ پانے والوں میں سے ہوں گے",
        english: "Our Lord! We have wronged ourselves, and if You forgive us not, we will be among the losers",
        reference: "Surah Al-A'raf 7:23"
    },
    {
        arabic: "اللَّهُمَّ اجعل في قلبي نورا",
        urdu: "اے اللہ! میرے دل میں نور رکھ",
        english: "O Allah! Place light in my heart",
        reference: "Bukhari & Muslim"
    },
    {
        arabic: "رَبِّ لَا تَذَرْنِي فَرْدًا وَأَنتَ خَيْرُ الْوَارِثِينَ",
        urdu: "اے میرے رب! مجھے اکیلا نہ چھوڑ اور تو سب سے بہتر وارث ہے",
        english: "My Lord! Leave me not single, though You are the Best of inheritors",
        reference: "Surah Al-Anbiya 21:89"
    },
    {
        arabic: "اللَّهُمَّ اغْفِرْ لِي خَطِيئَتِي وَجَهْلِي",
        urdu: "اے اللہ! میری غلطی اور جہالت کو معاف فرما",
        english: "O Allah! Forgive my mistakes and ignorance",
        reference: "Bukhari"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        urdu: "اے اللہ! میں تجھ سے غم اور پریشانی سے پناہ مانگتا ہوں",
        english: "O Allah! I seek refuge in You from anxiety and sorrow",
        reference: "Bukhari"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ وَالْجُبْنِ",
        urdu: "اے اللہ! میں بخل اور بزدلی سے پناہ مانگتا ہوں",
        english: "O Allah! I seek refuge in You from miserliness and cowardice",
        reference: "Bukhari & Muslim"
    },
    {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ وَقَهْرِ الرِّجَالِ",
        urdu: "اے اللہ! میں قرض کے بوجھ اور لوگوں کے ظلم سے پناہ مانگتا ہوں",
        english: "O Allah! I seek refuge in You from being in debt and from being overpowered by men",
        reference: "Abu Dawood"
    },
    {
        arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ",
        urdu: "اے اللہ! میرے دل کو نفاق سے پاک کر دے",
        english: "O Allah! Purify my heart from hypocrisy",
        reference: "Tirmidhi"
    },
    {
        arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ",
        urdu: "اے اللہ! مجھے حلال کے ذریعے حرام سے بچا لے",
        english: "O Allah! Suffice me with what You have allowed instead of what You have forbidden",
        reference: "Tirmidhi"
    },
    {
        arabic: "اللَّهُمَّ اغْفِرْ لِي وَلِلْمُسْلِمِينَ وَالْمُسْلِمَاتِ",
        urdu: "اے اللہ! مجھے، سب مسلمان مردوں اور عورتوں کو بخش دے",
        english: "O Allah! Forgive me, the believing men and believing women",
        reference: "Muslim"
    },
    {
        arabic: "اللَّهُمَّ اجعلنا من التوابين",
        urdu: "اے اللہ! ہمیں توبہ کرنے والوں میں شامل کر",
        english: "O Allah! Make us among those who repent",
        reference: "Quran & Sunnah"
    },
    {
        arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ",
        urdu: "اے میرے رب! مجھے سچائی کے ساتھ داخل کر",
        english: "My Lord! Cause me to enter a sound entrance",
        reference: "Surah Al-Isra 17:80"
    },
    {
        arabic: "اللَّهُمَّ اجعلني لك شكّاراً",
        urdu: "اے اللہ! مجھے تیرا شکر گزار بنا",
        english: "O Allah! Make me ever grateful to You",
        reference: "Tirmidhi"
    },
    {
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
        urdu: "اے ہمارے رب! ہم سے قبول فرما، بیشک تو سننے والا جاننے والا ہے",
        english: "Our Lord! Accept from us, indeed You are the Hearing, the Knowing",
        reference: "Surah Al-Baqarah 2:127"
    },
    {
        arabic: "اللَّهُمَّ اجعل القرآن ربيع قلبي",
        urdu: "اے اللہ! قرآن کو میرے دل کی بہار بنا دے",
        english: "O Allah! Make the Qur’an the spring of my heart",
        reference: "Ahmad"
    },
    {
        arabic: "اللَّهُمَّ اجعل عملي صالحاً",
        urdu: "اے اللہ! میرے عمل کو صالح بنا دے",
        english: "O Allah! Make my deeds righteous",
        reference: "Quran & Sunnah"
    }
];

// 4 GIF URLs
const GIFS = [
    "https://i.ibb.co/xtzqSRJ/77f2955007ec631cbc11ae3f18e9afc0.gif",
    "https://i.ibb.co/bR3XvZGm/c95ed0a218c202b0010200b7afd7a07b.gif",
    "https://i.ibb.co/WWMHYm2p/3e406ac0b161e19e988dcfedbf70f408.gif",
    "https://i.ibb.co/xS3NVjR6/b0a647ca1bdebb334177bcf3f972e9bd.gif"
];

module.exports.run = async function({ api, event }) {
    try {
        // Get random dua
        const duaData = DUA_DB[Math.floor(Math.random() * DUA_DB.length)];

        // Random GIF
        const gifURL = GIFS[Math.floor(Math.random() * GIFS.length)];
        const gifPath = path.join(__dirname, 'cache', `dua_${Date.now()}.gif`);

        // Download GIF
        const response = await axios({
            method: 'GET',
            url: gifURL,
            responseType: 'stream'
        });

        const writer = fs.createWriteStream(gifPath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Stylish message format
        const formattedMsg = `╔═════════════╗
    『 𝗗𝗨𝗔 』
╚═════════════╝

📜 𝗔𝗿𝗮𝗯𝗶𝗰:
${duaData.arabic}

🔵 𝗨𝗿𝗱𝘂 𝗧𝗿𝗮𝗻𝘀𝗹𝗮𝘁𝗶𝗼𝗻:
${duaData.urdu}

🔴 𝗘𝗻𝗴𝗹𝗶𝘀𝗵 𝗧𝗿𝗮𝗻𝘀𝗹𝗮𝘁𝗶𝗼𝗻:
${duaData.english}

📖 𝗥𝗲𝗳𝗲𝗿𝗲𝗻𝗰𝗲: ${duaData.reference}

👤 𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝗲𝗱 𝗯𝘆: ${event.senderName}
👑 𝗢𝘄𝗻𝗲𝗿: 𝐓𝐀𝐋𝐇𝐀 𝐏𝐀𝐓𝐇𝐀𝐍 💞`;

        // Send message with attachment
        api.sendMessage({
            body: formattedMsg,
            attachment: fs.createReadStream(gifPath)
        }, event.threadID, () => fs.unlinkSync(gifPath), event.messageID);

    } catch (error) {
        console.error("Dua Error:", error);
        const fallbackDua = DUA_DB[Math.floor(Math.random() * DUA_DB.length)];
        api.sendMessage(
            `╔═════════════╗
    『 𝗗𝗨𝗔 』
╚═════════════╝

📜 𝗔𝗿𝗮𝗯𝗶𝗰:
${fallbackDua.arabic}

🔵 𝗨𝗿𝗱𝘂 𝗧𝗿𝗮𝗻𝘀𝗹𝗮𝘁𝗶𝗼𝗻:
${fallbackDua.urdu}

🔴 𝗘𝗻𝗴𝗹𝗶𝘀𝗵 𝗧𝗿𝗮𝗻𝘀𝗹𝗮𝘁𝗶𝗼𝗻:
${fallbackDua.english}

⚠️ 𝗘𝗿𝗿𝗼𝗿 𝗹𝗼𝗮𝗱𝗶𝗻𝗴 𝗚𝗜𝗙
👑 𝗢𝘄𝗻𝗲𝗿: 𝐓𝐀𝐋𝐇𝐀 𝐏𝐀𝐓𝐇𝐀𝐍 💞`,
            event.threadID,
            event.messageID
        );
    }
};
