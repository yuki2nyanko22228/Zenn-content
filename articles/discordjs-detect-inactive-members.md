---
title: "【discord.js】非アクティブなメンバーを検知する"
emoji: "👥"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs", "mongodb"]
published: true
---

:::message
この記事は、discord.js で Bot を作成できる程度の技術を保持している人を対象としています。
:::

# はじめに

Discord には、[「非アクティブメンバーをキック」という機能](https://support.discord.com/hc/ja/articles/213507137) がありますが、この機能は「オンラインになっていないメンバーをキック」するもので、サーバーを利用していないメンバーは検知できません。

そこで、この記事では「サーバーを利用していないメンバーを検知する」方法を紹介します。

# 仕様

本記事では、以下のアクティビティを「サーバーを利用している」とみなすことにします。

- メッセージを送信する
- リアクションをつける

また、サーバーにてアクティビティを検知すると、ユーザー ID と日時を MongoDB に保存し、コマンドを使用することでサーバーを利用していないメンバーを一覧表示できるようにします。

# MongoDB のセットアップ

まず、MongoDB をローカルで立ち上げるか、[MongoDB Atlas](https://www.mongodb.com/atlas/database) にて無料のデータベースを作成してください。

次に、MongoDB へ接続する際に必要なライブラリである、`mongoose` をインストールしてください。

```sh
$ npm i mongoose
```

インストールが完了したら、mongoose を使用して MongoDB へ接続しましょう。

```js:index.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://xxxxxxx:xxxx/xxxxxxxxxxx');
```

これで完了です。Node.js で MongoDB へ接続できるようになりました。

# アクティビティを検知する

メッセージ送信時には `messageCreate` イベントが、リアクションをつけた時には `messageReactionAdd` イベントが発火します。

なので、以下のようにイベントハンドラを作成します。

```diff js:index.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://xxxxxxx:xxxx/xxxxxxxxxxx');

+ const { Client } = require('discord.js');
+ const client = new Client({
+   intents: [
+     'GUILDS',
+     'GUILD_MESSAGES',
+     'GUILD_MESSAGE_REACTIONS',
+   ],
+ });
+
+ const guildId = '000000000000000000';
+
+ client.on('ready', () => {
+   console.log('ready!');
+ });
+
+ client.on('messageCreate', (message) => {
+   if (message.author.bot || message.guild.id !== guildId) return;
+
+   console.log('messageCreate', message.author.id, Date.now());
+ });
+
+ client.on('messageReactionAdd', (reaction, user) => {
+   if (user.bot || reaction.message.guild.id !== guildId) return;
+
+   console.log('messageReactionAdd', user.id, Date.now());
+ });
+
+ client.login('xxxxxxxxxx.xxxx.xxxxxxxxxxxxxxxxx');
```

実行して以下のようなメッセージを送信し、リアクションを付けてみると、ログが出力され、正常にアクティビティを拾えていることが分かります。

![](/images/articles/discordjs-detect-inactive-members/image001.png)
![](/images/articles/discordjs-detect-inactive-members/image002.png)

# アクティビティを保存する

まず、MongoDB にアクティビティを保存するためのモデルを作成します。

models ディレクトリを作成し、以下のようにモデルを作成してください。

```js:models/activity.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  lastActivityAt: { type: Date, required: true },
});

module.exports = mongoose.model('Activity', schema);
```

次に、メインファイルに Model をインポートし、アクティビティを保存するためのメソッドを作成します。

仕組みとしては、`findOne()` を使用して既存のデータを検索して、該当ユーザーのオブジェクトが存在する場合は `lastActivityAt` を更新し、存在しない場合は新しいオブジェクトを作成するようになっています。

```diff js:index.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://xxxxxxx:xxxx/xxxxxxxxxxx');

+ const Activity = require('./models/activity');

const { Client } = require('discord.js');

// ...

client.on('messageCreate', (message) => {
  if (message.author.bot || message.guild.id !== guildId) return;

-   console.log('messageCreate', message.author.id, Date.now());
+   saveActivity(message.author.id);
});

client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot || reaction.message.guild.id !== guildId) return;

-   console.log('messageReactionAdd', user.id, Date.now());
+   saveActivity(user.id);
});

+ function saveActivity(userId) {
+   Activity.findOne({ userId }, (err, activity) => {
+     if (err) return console.error(err);
+
+     if (!activity) {
+       activity = new Activity({
+         userId,
+         lastActivityAt: Date.now(),
+       });
+     } else {
+       activity.lastActivityAt = Date.now();
+     }
+
+     activity.save((err) => {
+       if (err) return console.error(err);
+     });
+   });
+ };

client.login('xxxxxxxxxx.xxxx.xxxxxxxxxxxxxxxxx');
```

実行してメッセージを送信してみると、以下のようにアクティビティが保存されていることが分かります。

![](/images/articles/discordjs-detect-inactive-members/image003.png)
![](/images/articles/discordjs-detect-inactive-members/image004.png)

# アクティビティを検索する

コマンドで非アクティブメンバーを検索できるようにしてみます。

```diff js:index.js
// ...

const { Client } = require('discord.js');
const client = new Client({
  intents: [
    'GUILDS',
+     'GUILD_MEMBERS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
  ],
});

// ...

client.on('messageCreate', (message) => {
  if (message.author.bot || message.guild.id !== guildId) return;

+   if (message.content.startsWith('!inactive-members')) {
+     if (
+       !message.content.split(' ')[1] ||
+       isNaN(message.content.split(' ')[1])
+     ) {
+       message.reply('コマンドが不正です。');
+       return;
+     }
+
+     const month = parseInt(message.content.split(' ')[1]);
+     const now = Date.now();
+     const query = now - month * 30 * 24 * 60 * 60 * 1000;
+
+     Activity.find(
+       {
+         lastActivityAt: { $lt: query },
+       },
+       (err, activities) => {
+         if (err) return console.error(err);
+
+         const inactiveMembers = activities.map((activity) => {
+           return client.guilds.cache.get(guildId).members.cache.get(activity.userId);
+         });
+
+         message.reply(
+           `${
+             month * 30
+           }日以上サーバーを利用していないメンバー:\n\n${inactiveMembers
+             .map((member) => `${member.user.tag} (${member.id})`)
+             .join('\n') || '*いません*'}`
+         );
+       }
+     );
+   }
+

  saveActivity(message.author.id);
});

// ...
```

コマンドを使ってみると、以下のように非アクティブメンバーを検索できました。

![](/images/articles/discordjs-detect-inactive-members/image005.png)
![](/images/articles/discordjs-detect-inactive-members/image006.png)

# コード

以下に完成したコードを掲載しました。

https://github.com/tubuanha/Zenn-content/tree/master/code-samples/articles/discordjs-detect-inactive-members

# まとめ

本記事では、非アクティブメンバーを検知し、検索するコマンドを作成してみました。

少しでも Discord サーバー管理のお役に立てれば幸いです。

ここまでお読みいただき、ありがとうございました。
