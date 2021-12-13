---
title: "discord.jsで掲示板機能を作る"
emoji: "📌"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: false
---

こんにちは！

この記事では、discord.jsで掲示板機能(チャンネル作成機能)を作る方法をご紹介します！

# チャンネル作成

まず、ベースとなるコードです。

パッケージを読み込んで、bot以外のメッセージを無視しているだけです。

```diff js
+ const discord = require('discord.js');
+ const client = new discord.Client();
+ 
+ client.on('message', async message => {
+ 	if (message.author.bot) return;
+ });
```

## Step1 チャンネル作成用のチャンネルのIDを指定

この記事では、チャンネル作成用のチャンネルにメッセージを送信すると、そのままチャンネルが作成される方法で行きます。

そこで、チャンネルIDを指定する必要があります。

```diff js
const discord = require('discord.js');
const client = new discord.Client();

client.on('message', async message => {
  if (message.author.bot) return;
+   if (message.channel.id == '<チャンネルIDをここへ>') {
+   
+   }
});
```

## Step2 チャンネル作成

https://discord.js.org/#/docs/main/stable/class/GuildChannelManager?scrollTo=create

ドキュメントを参考にして、チャンネル作成のコードを書きます。

カテゴリIDはチャンネル作成先のカテゴリIDです。

```diff js
const discord = require('discord.js');
const client = new discord.Client();

client.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.id == '<チャンネルIDをここへ>') {
+     const crch = await message.guild.channels.create(message.content, {
+ 			parent: '<カテゴリIDをここへ>',
+ 			topic: `<@!${message.author.id}> さんのチャンネル`
+ 		});
  }
});
```
