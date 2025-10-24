module.exports.config = {
  name: "meme",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "Random joke image",
  commandCategory: "Image",
  usages: "joke",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }

};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = ["https://i.imgur.com/zoQxUwC.jpg", "https://i.imgur.com/bXVBasN.jpg", "https://i.imgur.com/E3bMZMM.jpg", "https://i.imgur.com/pkchwDe.jpg", "https://i.imgur.com/PFV6etU.jpg", "https://i.imgur.com/DLElS0y.jpg", "https://i.imgur.com/6hufzML.jpg", "https://i.imgur.com/ikevA6M.jpg", "https://i.imgur.com/aGuU2tB.jpg", "https://i.imgur.com/tsUsL6B.jpg", "https://i.imgur.com/sAUL2X0.jpg", "https://i.imgur.com/fGSX9z3.jpg", "https://i.imgur.com/TeT8dXA.jpg", "https://i.imgur.com/kCnHvly.jpg", "https://i.imgur.com/wfB1cU7.jpg", "https://i.imgur.com/dmUAjtN.jpg", "https://i.imgur.com/RqaTxa4.jpg", "https://i.imgur.com/gXFNJGi.jpg", "https://i.imgur.com/DwDTSsS.jpg", "https://i.imgur.com/BSreuve.jpg", "https://i.imgur.com/B6TOC4a.jpg", "https://i.imgur.com/S83pmyW.jpg", "https://i.imgur.com/7FNPBkX.jpg", "https://i.imgur.com/SIdbUrD.jpg", "https://i.imgur.com/ErngTHc.jpg", "https://i.imgur.com/onfBoPC.jpg", "https://i.imgur.com/UVk3zcd.jpg", "https://i.imgur.com/3aOuDZ9.jpg", "https://i.imgur.com/OHfqttV.jpg", "https://i.imgur.com/aiNRtVF.jpg", 
