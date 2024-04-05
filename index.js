const { Client } = require('discord.js');
const client = new Client()
const prefix = '.'; // Komutları başlatmak için kullanılacak önek

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ayarla') {
    if (!args.length) {
      return message.reply('Kullanım: `.ayarla setting value`');
    }

    const setting = args[0].toLowerCase();
    const value = args.slice(1).join(' ');

    // Kullanıcının kimliğini al
    const userID = message.author.id;

    // Kullanıcının önceki ayarlarını yükleyin
    const filePath = `database/${userID}.json`;
    const userSettings = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : {};

    // Yeni ayarı ekleyin
    userSettings[setting] = value;

    // Güncellenmiş ayarları kullanıcının bilgilerine ekleyin
    users[userID] = userSettings;

    // JSON dosyasına yaz
    fs.writeFileSync(filePath, JSON.stringify(userSettings, null, 2));

    message.reply(`Ayarlar başarıyla güncellendi: ${setting}=${value}`);
  }
});

client.login('OTYxNzQzNDI2MjQyNjA5MTc0.G1vzch.-NN0myXwa_oyNeINdgFbG6cf0a6yAjUv9vp_FI');
