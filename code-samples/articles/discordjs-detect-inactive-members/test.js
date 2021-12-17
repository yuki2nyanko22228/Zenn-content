const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://zenn:zenn@cluster0.1q34p.mongodb.net/discordjsDetectInactiveMembers?retryWrites=true&w=majority'
);

const Activity = require('./models/activity');

const { Client } = require('discord.js');
const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS'],
});

const guildId = '747053403154284605';

client.on('ready', () => {
  console.log('ready!');
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!inactive-members')) {
    if (
      !message.content.split(' ')[1] ||
      isNaN(message.content.split(' ')[1])
    ) {
      message.reply('コマンドが不正です。');
      return;
    }

    const month = parseInt(message.content.split(' ')[1]);
    const now = Date.now();
    const query = now - month * 30 * 24 * 60 * 60 * 1000;

    Activity.find(
      {
        lastActivityAt: { $lt: query },
      },
      (err, activities) => {
        if (err) return console.error(err);

        const inactiveMembers = activities.map((activity) => {
          return client.guilds.cache.get(guildId).members.cache.get(activity.userId);
        });

        message.reply(
          `${
            month * 30
          }日以上サーバーを利用していないメンバー:\n\n${inactiveMembers
            .map((member) => `${member.user.tag} (${member.id})`)
            .join('\n') || '*いません*'}`
        );
      }
    );
  }

  if (message.guild.id !== guildId) return;

  saveActivity(message.author.id);
});

client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot || reaction.message.guild.id !== guildId) return;

  saveActivity(user.id);
});

function saveActivity(userId) {
  Activity.findOne({ userId }, (err, activity) => {
    if (err) return console.error(err);

    if (!activity) {
      activity = new Activity({
        userId,
        lastActivityAt: Date.now(),
      });
    } else {
      activity.lastActivityAt = Date.now();
    }

    activity.save((err) => {
      if (err) return console.error(err);
    });
  });
}

client.login('OTEyMzczMjM3MjAyMTczOTcz.YZu_yg.A1QScBX8xCSJXFT6Yo0um8kQGsU');
