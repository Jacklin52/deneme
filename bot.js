const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();
const port = 3000;
const sharp = require('sharp');
const moment = require('moment');
const { Client, GatewayIntentBits,EmbedBuilder  } = require('discord.js');
const { start } = require('repl');
const prefix = '.'; // Komutları başlatmak için kullanılacak önek
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
  ],
});
let users = {};

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const { MessageEmbed } = require('discord.js');

  client.on('messageCreate', (message , member) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
  
    if (command === 'set') {
      if (args.length < 2) {
        return message.reply('`.set <key> <value>`');
      }
  
      const setting = args[0].toLowerCase();
      const value = args.slice(1).join(' ');
  
      // Kullanıcının kimliğini al
      const userID = message.author.id;
  
      // Kullanıcının önceki ayarlarını yükleyin
      const filePath = `database/${userID}.json`;
      const userSettings = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};
  
      // Yeni ayarı ekleyin
      if (!userSettings.data) {
        userSettings.data = { kv: {} };
      }
      userSettings.data.kv[setting] = value;
  
      // Güncellenmiş ayarları kullanıcının bilgilerine ekleyin
      users[userID] = userSettings;
  
      // JSON dosyasına yaz
      fs.writeFileSync(filePath, JSON.stringify(userSettings, null, 2));
  
      message.reply(`<a:onay:1206655777285083166> \`${setting}\` was set. View it with .get \`${setting}\` or go to https://rocksai.com/v1/users/${userID}`);
    } else if (command === 'del') {
      if (args.length < 1) {
        return message.reply('`.del <key>`');
      }
    
      const setting = args[0].toLowerCase();
    
      // Kullanıcının kimliğini al
      const userID = message.author.id;
    
      // Kullanıcının önceki ayarlarını yükleyin
      const filePath = `database/${userID}.json`;
      const userSettings = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};
    
      // Silinecek ayarı kontrol et ve sil
      if (userSettings.data && userSettings.data.kv && userSettings.data.kv.hasOwnProperty(setting)) {
        const value = userSettings.data.kv[setting];
        delete userSettings.data.kv[setting];
    
        // Güncellenmiş ayarları kullanıcının bilgilerine ekleyin
        users[userID] = userSettings;
    
        // JSON dosyasına yaz
        fs.writeFileSync(filePath, JSON.stringify(userSettings, null, 2));
    
        message.reply(`<a:onay:1206655777285083166> Deleted key: \`${setting}\` `);
      } else {
        message.reply('Belirtilen ayar bulunamadı.');
      }
    }
     else if (command === 'kvbilgileri') {
      // Kullanıcının kimliğini al
      const userId = message.author.id;

      // Kullanıcının kv bilgilerini al
      const filePath = `database/${userId}.json`;
  
      try {
        // Dosya varsa oku, yoksa boş bir nesne döndür
        const userData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
  
        // Kv bilgilerini içeren bir dizi oluştur
        const kvEntries = [];
  
        // userData'daki kv nesnesini döngüye alarak kvEntries dizisine ekleyelim
        if (userData.data && userData.data.kv) {
          for (const [key, value] of Object.entries(userData.data.kv)) {
            kvEntries.push({ name: key, value });
          }
        }
  
      const userAvatarURL = message.author.displayAvatarURL({ format: 'png', dynamic: true });

      // Embed oluştur
      const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Rocksai Whois')
      .setAuthor({ name: message.author.username, iconURL: userAvatarURL })
      .setThumbnail(userAvatarURL)
    message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Error:', error);
      message.reply(`An error occurred while fetching user data: ${error.message}`);
    }
  }else if (command === 'get') {
    if (args.length < 1) {
      return message.reply('`.get <key>`');
    }
  
    const setting = args[0].toLowerCase();
  
    // Kullanıcının kimliğini al
    const userID = message.author.id;
  
    // Kullanıcının önceki ayarlarını yükleyin
    const filePath = `database/${userID}.json`;
    const userSettings = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};
  
    // Anahtarı kontrol et ve değerini al
    if (userSettings.data && userSettings.data.kv && userSettings.data.kv.hasOwnProperty(setting)) {
      const value = userSettings.data.kv[setting];
      message.reply(`\`\`\`javascript\n\ ${setting} = ${JSON.stringify(value)};\n\`\`\``);
    } else {
      message.reply('Belirtilen anahtar bulunamadı.');
    }
  }
  
});

  const guildId = '961743048268742668'; // Sunucu ID'sini buraya ekleyin
  const guild = client.guilds.cache.get(guildId);

  if (guild) {
    console.log(`Üye Sayısı: ${guild.memberCount}`);
  } else {
    console.log("Sunucu İd'si Bulunamadı.");
  }

  await guild.members.fetch();
  
  // Verileri saklamak için boş bir nesne oluştur
  const users = {};
  
  // Tüm üyeler üzerinde dön
  for (const [userId, member] of guild.members.cache) {
      const createdTimestamp = member.user.createdTimestamp;
      const createdDate = new Date(createdTimestamp);
      const status = member.presence && member.presence.status ? member.presence.status : 'offline';
      console.log(`${member.user.tag} (${member.user.id})`);
  
      const desktopStatus = member.presence?.clientStatus?.desktop;
      const mobileStatus = member.presence?.clientStatus?.mobile;
      // Kullanıcı bannerını almak için fetch edin
      await member.user.fetch();
      const customStatus = member.presence?.activities?.[0]?.state;
  
      const activitiess = member.presence?.activities || [];
      const customStatusActivity = activitiess.find(activity => activity.type === 4);
      const spotifyActivity = activitiess.find(activity => activity.name === 'Spotify');
      const visualStudioCodeActivity = activitiess.find(activity => activity.type === 0);
    
      let activities = [];
      
      if (customStatusActivity) {
          const { timestamps, url, details, applicationId, party, syncId, assets, flags, buttons, ...rest } = customStatusActivity;
          const { start } = timestamps || {};
          activities.push({ ...rest });
      }
      
      if (spotifyActivity) {
          const { emoji, buttons, applicationId, url, flags, createdTimestamp, smallImage, timestamps, ...rest } = spotifyActivity;
          const { start, end } = timestamps || {};
          const startTimeInSeconds = start ? Math.floor(start / 1000) : null;
          const endTimeInSeconds = end ? Math.floor(end / 1000) : null;
          const startTimeInMillis = start ? new Date(start).getTime() : null;
          const endTimeInMillis = end ? new Date(end).getTime() : null;
          activities.push({ flags, ...rest, timestamps: { start: startTimeInSeconds, end: endTimeInSeconds } });
      }
      
      if (visualStudioCodeActivity) {
          const { type, party, syncId, buttons, url, flags, createdTimestamp, smallImage, timestamps, ...rest } = visualStudioCodeActivity;
          const { start } = timestamps || {};
          const startTimeInSeconds = start ? Math.floor(start / 1000) : null;
          const startTimeInMillis = start ? new Date(start).getTime() : null;
          activities.push({ ...rest, timestamps: { start: startTimeInSeconds } });
      }
    
      
      if (activities.length > 0) {
          console.log("Aktiviteler bulundu:", activities);
      } else {
          console.log("Herhangi bir aktivite bulunamadı.");
      }
      
      // Kullanıcının bilgilerini nesneye ekle
      users[userId] = {
          success: true,
          data: {
            kv: {},    
              active_on_discord_mobile: mobileStatus ? 'true' : 'false',
              active_on_discord_desktop: desktopStatus ? 'true' : 'false',
              discord_user: {
                  username: member.user.username,
                  id: member.user.id,
                  display_name: member.displayName,
                  global_name: member.displayName,
                  avatar: member.user.displayAvatarURL().replace(`https://cdn.discordapp.com/avatars/${member.user.id}/`, "").replace(".webp", "").replace(".gif", "").replace(".png", ""),
                  banner: member.user.bannerURL() || null,
                  discriminator: member.user.discriminator,
                  bot: member.user.bot,
                  created: createdDate.toLocaleDateString(),
                  state: status,
              },
              activities
          },
      };
  
      const imgFolderPath = path.join(__dirname, 'img');
      if (!fs.existsSync(imgFolderPath)) {
        fs.mkdirSync(imgFolderPath);
      }
      

        const avatarUrl = member.user.displayAvatarURL({ format: 'png', size: 1024 });
        const avatarFileName = `${userId}.png`;
        const avatarFilePath = path.join(imgFolderPath, avatarFileName);
      
        const avatarFile = fs.createWriteStream(avatarFilePath);
        https.get(avatarUrl, function(response) {
          response.pipe(avatarFile);
        });
      
        avatarFile.on('finish', function() {
          console.log(`Avatar başarıyla kaydedildi: ${avatarFileName}`);
        });
      
        avatarFile.on('error', function(err) {
          console.error(`Avatar kaydedilirken bir hata oluştu: ${err}`);
        });


      // JSON formatında dosyaya yaz
      const filePath = `database/${userId}.json`;
      fs.writeFileSync(filePath, JSON.stringify(users[userId], null, 2));
  
      console.log(`Kullanıcı bilgileri ${userId}.json dosyasına yazıldı.`);
      
}
  

  console.log('Tüm üyelerin bilgileri çekildi ve dosyalara yazıldı.');

////////////// üye kendini güncellediğinde 


client.on('presenceUpdate', async (oldPresence, newPresence) => {
  await updateMemberInfo(newPresence.member);
  console.log(`Kullanıcı bilgileri güncellendi: ${newPresence.member.user.tag}`);
});

async function updateMemberInfo(member) {
  await member.user.fetch();
  await guild.members.fetch();
  const userId = member.user.id;
  const userData = users[userId];

  // Kullanıcı bilgisi yoksa
  if (!userData) {
    console.log(`Kullanıcı bilgileri bulunamadı: ${userId}`);
  }

  const filePath = `database/${userId}.json`;

  try {
    // Dosya varsa oku, yoksa boş bir nesne oluştur
    const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};

    // Eğer yeni veri içinde kv değeri yoksa sadece eski kv değerini kopyala
    if (!userData.data.kv) {
      userData.data.kv = existingData.data.kv || {};
    }

    // Eğer yeni veri içinde kv değeri varsa, eski kv değerlerini koru
    if (userData.data.kv) {
      userData.data.kv = { ...existingData.data.kv, ...userData.data.kv };
    }

    // Eski verileri ve yeni verileri birleştir
    const updatedData = {
      ...existingData,
      ...userData,
    };

    // JSON formatındaki dosyayı güncelle ve kaydet
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    const newAvatarFileName = `${userId}.png`; // Yeni avatarın dosya adı
    const newAvatarFilePath = path.join(__dirname, 'img', newAvatarFileName); // Yeni avatarın dosya yolu
    const newAvatarUrl = member.user.displayAvatarURL({ format: 'png', size: 1024 });
    
    const newAvatarFile = fs.createWriteStream(newAvatarFilePath);
    
    const requestNew = https.get(newAvatarUrl, function(response) {
      response.pipe(newAvatarFile);
    });
    
    requestNew.on('error', function(err) {
      console.error(`Yeni avatar indirilirken bir hata oluştu: ${err}`);
    });
    
    newAvatarFile.on('finish', function() {
      console.log(`Yeni avatar başarıyla kaydedildi: ${newAvatarFileName}`);
    });
    
    newAvatarFile.on('error', function(err) {
      console.error(`Yeni avatar kaydedilirken bir hata oluştu: ${err}`);
    });
    
    console.log(`Kullanıcı bilgileri güncellendi ve dosya kaydedildi: ${userId}`);
  } catch (error) {
    console.error(`Hata oluştu: ${error.message}`);
  }
// Yeni avatar dosyasını indirip kaydetmek

  const createdTimestamp = member.user.createdTimestamp;
  const createdDate = new Date(createdTimestamp);
  const status = member.presence && member.presence.status ? member.presence.status : 'offline';
  const desktopStatus = member.presence?.clientStatus?.desktop;
  const mobileStatus = member.presence?.clientStatus?.mobile;
  const customStatus = member.presence?.activities?.[0]?.state;
  const activitiess = member.presence?.activities || [];
  const customStatusActivity = activitiess.find(activity => activity.type === 4);
  const spotifyActivity = activitiess.find(activity => activity.name === 'Spotify');
  const visualStudioCodeActivity = activitiess.find(activity => activity.type === 0);

  let activities = [];
  
  if (customStatusActivity) {
      const { timestamps, url, details, applicationId, party, syncId, assets, flags, buttons, ...rest } = customStatusActivity;
      const { start } = timestamps || {};
      activities.push({ ...rest });
  }
  
  if (spotifyActivity) {
      const { emoji, buttons, applicationId, url, flags, createdTimestamp, smallImage, timestamps, ...rest } = spotifyActivity;
      const { start, end } = timestamps || {};
      const startTimeInSeconds = start ? Math.floor(start / 1000) : null;
      const endTimeInSeconds = end ? Math.floor(end / 1000) : null;
      const startTimeInMillis = start ? new Date(start).getTime() : null;
      const endTimeInMillis = end ? new Date(end).getTime() : null;
      activities.push({ flags, ...rest, timestamps: { start: startTimeInSeconds, end: endTimeInSeconds } });
  }
  
  if (visualStudioCodeActivity) {
      const { type, party, syncId, buttons, url, flags, createdTimestamp, smallImage, timestamps, ...rest } = visualStudioCodeActivity;
      const { start } = timestamps || {};
      const startTimeInSeconds = start ? Math.floor(start / 1000) : null;
      const startTimeInMillis = start ? new Date(start).getTime() : null;
      activities.push({ ...rest, timestamps: { start: startTimeInSeconds } });
  }

  
  if (activities.length > 0) {
      console.log("Aktiviteler bulundu:", activities);
  } else {
      console.log("Herhangi bir aktivite bulunamadı.");
  }
  
  const updatedData = {
    success: true,
    data: {     
       kv: userData.data.kv,
      active_on_discord_mobile: mobileStatus ? 'true' : 'false',
      active_on_discord_desktop: desktopStatus ? 'true' : 'false',

      discord_user: {
        username: member.user.username,
        id: member.user.id,
        display_name: member.displayName,
        global_name: member.displayName,
        avatar: member.user.displayAvatarURL().replace(`https://cdn.discordapp.com/avatars/${member.user.id}/`, "").replace(".webp", "").replace(".gif", "").replace(".png", ""),
        banner: member.user.bannerURL() || null,
        discriminator: member.user.discriminator,
        bot: member.user.bot,
        created: createdDate.toLocaleDateString(),
        state: status,
      },
      activities
    },
  };

  users[member.user.id] = updatedData;
}


  

//////// sunucuya girdiğinde 

client.on('guildMemberAdd', async (member) => {
  await updateServer(member);
  console.log(`Sunucuya katılan kullanıcı bilgileri güncellendi: ${member.user.tag}`);
});
async function updateServer(member) {
  await member.user.fetch();
  await guild.members.fetch();
  const createdTimestamp = member.user.createdTimestamp;
  const createdDate = new Date(createdTimestamp);
  const status = member.presence && member.presence.status ? member.presence.status : 'offline';
  const desktopStatus = member.presence?.clientStatus?.desktop;
  const mobileStatus = member.presence?.clientStatus?.mobile;
  const customStatus = member.presence?.activities?.[0]?.state;


  const activitiess = member.presence?.activities || [];
  const customStatusActivity = activitiess.find(activity => activity.type === 4);
  const spotifyActivity = activitiess.find(activity => activity.name === 'Spotify');
  const visualStudioCodeActivity = activitiess.find(activity => activity.type === 0);

  let activities = [];
  
  if (customStatusActivity) {
      const { timestamps, url, details, applicationId, party, syncId, assets, flags, buttons, ...rest } = customStatusActivity;
      const { start } = timestamps || {};
      activities.push({ ...rest });
  }
  
  if (spotifyActivity) {
      const { emoji, buttons, applicationId, url, flags, createdTimestamp, smallImage, timestamps, ...rest } = spotifyActivity;
      const { start, end } = timestamps || {};
      const startTimeInSeconds = start ? Math.floor(start / 1000) : null;
      const endTimeInSeconds = end ? Math.floor(end / 1000) : null;
      const startTimeInMillis = start ? new Date(start).getTime() : null;
      const endTimeInMillis = end ? new Date(end).getTime() : null;
      activities.push({ flags, ...rest, timestamps: { start: startTimeInSeconds, end: endTimeInSeconds } });
  }
  
  if (visualStudioCodeActivity) {
      const { type, party, syncId, buttons, url, flags, createdTimestamp, smallImage, timestamps, ...rest } = visualStudioCodeActivity;
      const { start } = timestamps || {};
      const startTimeInSeconds = start ? Math.floor(start / 1000) : null;
      const startTimeInMillis = start ? new Date(start).getTime() : null;
      activities.push({ ...rest, timestamps: { start: startTimeInSeconds } });
  }

  
  if (activities.length > 0) {
      console.log("Aktiviteler bulundu:", activities);
  } else {
      console.log("Herhangi bir aktivite bulunamadı.");
  }
  
  

  const updatedData = {
    success: true,
    data: {
      kv: {},    
      active_on_discord_mobile: mobileStatus ? 'true' : 'false',
      active_on_discord_desktop: desktopStatus ? 'true' : 'false',
      discord_user: {
        username: member.user.username,
        id: member.user.id,
        display_name: member.displayName,
        global_name: member.displayName,
        avatar: member.user.displayAvatarURL().replace(`https://cdn.discordapp.com/avatars/${member.user.id}/`, "").replace(".webp", "").replace(".gif", "").replace(".png", ""),
        banner: member.user.bannerURL() || null,
        discriminator: member.user.discriminator,
        bot: member.user.bot,
        created: createdDate.toLocaleDateString(),
        state: status,
      },
      activities
    },
  };

  users[member.user.id] = updatedData;
}

/// sunucudan ayrıldıgında 

client.on('guildMemberRemove', async (member) => {
  await deleteData(member);
  console.log(`Sunucudan ayrılan kullanıcı bilgileri silindi: ${member.user.tag}`);
});
async function deleteData(member) {

  const deletedata = {
    success: false,
    error: 'Kullanıcı bulunamadı'
  };
  
  users[member.user.id] = deletedata;
  
}



 /// User Sorgu
 app.get('/users/:discordID', (req, res) => {
  const discordID = req.params.discordID;
  const filePath = `database/${discordID}.json`;

  try {
      // Dosyayı oku
      const data = fs.readFileSync(filePath, 'utf8');
      const userData = JSON.parse(data);

      if (userData) {
          res.json(userData);
      } else {
          res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      }
  } catch (error) {
      console.error(`Hata oluştu: ${error.message}`);
      res.status(500).json({ error: 'Sunucu hatası' });
  }
});

   /// webp to png view
app.use(express.static('img'));
  app.get('/:userId.png', (req, res) => {
    const userId = req.params.userId;
    const imagePathWebP = path.join(__dirname, 'img', `${userId}.webp`);
    const imagePathPNG = path.join(__dirname, 'img', `${userId}.png`);
  
    // Kontrol et: Eğer webp dosyası varsa, dönüştür ve png olarak gönder
    if (fs.existsSync(imagePathWebP)) {
      sharp(imagePathWebP)
        .toFormat('png')
        .toFile(imagePathPNG, (err) => {
          if (err) {
            console.error('Dönüştürme hatası:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.sendFile(imagePathPNG);
          }
        });
    } 
    else {
      res.status(404).send('Kullanıcının avatarı bulunamadı.');
    }
  });

  const widget1 = require('./widgets/visual_large');
  const widget2 = require('./widgets/spotify_small');
  const widget3 = require('./widgets/custom_status');
  app.get('/card/:discordID', async (req, res) => {
    const discordID = req.params.discordID;
    const widgetTur = req.query.type;
    const theme = req.query.theme && (req.query.theme === 'dark' ? 'dark' : 'light') || 'light';

    let widgetHTML;

    switch (widgetTur) {
        case 'visual_large':
            widgetHTML = await widget1.render(client, discordID, theme);
            break;
        case 'spotify_small': // Handle the new widget type
            widgetHTML = await widget2.render(client, discordID, theme);
            break;
        case 'custom_status': // Handle the new widget type
            widgetHTML = await widget3.render(client, discordID, theme);
            break;
        default:
            widgetHTML = '<p>Geçersiz veya belirtilmeyen widget türü</p>';
            break;
    }

  
      const iframeHTML = `
          <html>
              <head>
              </head>
              <body>    
                      ${widgetHTML}
              </body>
          </html>
      `;
  
      res.send(iframeHTML);
  });
  
  
/// Server start
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
/// bot start

client.login('OTYxNzQzNDI2MjQyNjA5MTc0.GZ0_y_.S3aGOJYiwaEl95iZfCipNkAnvMnvYaHs3kU9EE');
