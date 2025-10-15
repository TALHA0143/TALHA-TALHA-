const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
    name: "protectgroup",
    eventType: ["log:thread-name", "log:thread-icon", "log:thread-color", "log:thread-image"],
    version: "4.0.0",
    credits: "Kashif Raza",
    description: "Automatically restore group settings if someone changes them"
};

if (!global.gcProtectionProcessing) {
    global.gcProtectionProcessing = new Map();
}

module.exports.run = async function({ event, api }) {
    const { threadID, logMessageType, author } = event;

    const cachePath = path.join(__dirname, "../commands/cache", "protectgroup.json");

    if (!fs.existsSync(cachePath)) {
        return;
    }

    let protectData = JSON.parse(fs.readFileSync(cachePath, "utf-8"));

    if (!protectData[threadID] || !protectData[threadID].enabled) {
        return;
    }

    // Don't restore if bot made the change
    const botID = api.getCurrentUserID();
    if (author == botID) {
        return;
    }

    const eventKey = `${threadID}_${logMessageType}_${author || 'unknown'}`;
    const botRestorationKey = `bot_restore_${threadID}_${logMessageType}`;

    if (global.gcProtectionProcessing.has(eventKey)) {
        return;
    }

    if (global.gcProtectionProcessing.has(botRestorationKey)) {
        global.gcProtectionProcessing.delete(botRestorationKey);
        return;
    }

    global.gcProtectionProcessing.set(eventKey, true);
    setTimeout(() => global.gcProtectionProcessing.delete(eventKey), 5000);

    const savedSettings = protectData[threadID];

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        let restoredSettings = [];

        switch (logMessageType) {
            case "log:thread-name": {
                try {
                    global.gcProtectionProcessing.set(botRestorationKey, true);
                    await api.setTitle(savedSettings.name, threadID);
                    restoredSettings.push('📝 Name');
                } catch (err) {
                    console.log("Error restoring name:", err);
                    global.gcProtectionProcessing.delete(botRestorationKey);
                }
                break;
            }

            case "log:thread-icon": {
                try {
                    global.gcProtectionProcessing.set(botRestorationKey, true);
                    await api.changeThreadEmoji(savedSettings.emoji, threadID);
                    restoredSettings.push('😊 Emoji');
                } catch (err) {
                    console.log("Error restoring emoji:", err);
                    global.gcProtectionProcessing.delete(botRestorationKey);
                }
                break;
            }

            case "log:thread-color": {
                if (savedSettings.themeId) {
                    try {
                        global.gcProtectionProcessing.set(botRestorationKey, true);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await api.changeThreadColor(savedSettings.themeId, threadID);
                        restoredSettings.push('🎨 Theme');
                    } catch (err) {
                        console.log("Error restoring theme:", err);
                        global.gcProtectionProcessing.delete(botRestorationKey);
                    }
                }
                break;
            }

            case "log:thread-image": {
                if (savedSettings.imagePath && fs.existsSync(savedSettings.imagePath)) {
                    try {
                        global.gcProtectionProcessing.set(botRestorationKey, true);
                        await new Promise(resolve => setTimeout(resolve, 1500));

                        const imageStream = fs.createReadStream(savedSettings.imagePath);

                        await api.changeGroupImage(imageStream, threadID, (err) => {
                            global.gcProtectionProcessing.delete(botRestorationKey);
                            if (err) {
                                console.log("Error restoring photo:", err);
                            }
                        });

                        await new Promise(resolve => setTimeout(resolve, 1000));
                        restoredSettings.push('🖼️ Picture');
                    } catch (err) {
                        console.log("Error restoring picture:", err);
                        global.gcProtectionProcessing.delete(botRestorationKey);
                    }
                } else if (!savedSettings.hasImage) {
                    api.sendMessage(
                        `⚠️ Group Protection Active!\n\n` +
                        `Picture was added, but original group had no picture.\n` +
                        `Note: Picture cannot be removed automatically.`,
                        threadID
                    );
                }
                break;
            }
        }

        if (restoredSettings.length > 0) {
            await api.sendMessage(
                `⚠️ Group Protection Active!\n\n` +
                `Settings changed and restored:\n${restoredSettings.join('\n')}`,
                threadID
            );
        }

        global.gcProtectionProcessing.delete(eventKey);

    } catch (error) {
        console.log("Error in protectgroup event:", error);
        global.gcProtectionProcessing.delete(eventKey);
        api.sendMessage(
            `❌ Protection Error: ${error.message || 'Unknown error'}`,
            threadID
        );
    }
};