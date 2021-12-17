const mongoose = require('mongoose');
mongoose.connect('mongodb://xxxxxxx:xxxx/xxxxxxxxxxx');

const { Client } = require('discord.js');
const client = new Client({
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
  ],
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const activity = new Activity({
    userId: message.author.id,
    lastActivityAt: new Date(),
  });

  activity.save();
});

client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) return;

  const activity = new Activity({
    userId: user.id,
    lastActivityAt: new Date(),
  });

  activity.save();
});
