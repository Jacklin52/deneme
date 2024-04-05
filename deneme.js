

const token = 'OTYxNzQzNDI2MjQyNjA5MTc0.G1vzch.-NN0myXwa_oyNeINdgFbG6cf0a6yAjUv9vp_FI';
const Discord = require('discord.js');
const fs = require('fs');
const prefix = '!';

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', (message) => {

  if (message.content === 'getusers') {
    message.reply('pong')
  }
});

function logUserIds(guild) {
  const userIds = guild.members.cache.map(member => member.user.id);
  const userIdsString = userIds.join('\n');

  fs.writeFile('userIds.txt', userIdsString, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('User IDs written to userIds.txt');
    // Optional: Respond to the command user
    message.reply('User IDs written to userIds.txt');
  });
}

client.login(token);
