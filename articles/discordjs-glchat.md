---
title: "discord.jsでグローバルチャットを作るサンプル"
emoji: "💬"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

:::message
エラーが出るようだったので修正しました。 (2021/04/14 21:20)
:::

画像を送信できるものがなかったので作りました。

# チャンネル名

`チャンネル名をここへ`部分は置き換えてください

```js
const discord = require("discord.js");
const client = new discord.Client();

client.on("message", message => {
    if(message.author.bot || message.channel.name !== "チャンネル名をここへ") return;
    client.channels.cache.filter(
      (ch) => 
        ch.name === "チャンネル名をここへ" &&
        ch.type === "text" && 
        ch.id !== message.channel.id
    )
    .forEach(ch => {
        ch.send(
            new discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(message.content)
            .setImage(
                message.attachments.map(a => a.url).shift() || null
            )
            .setFooter(message.guild.name, message.guild.iconURL())           
        );
    });
});
```

# トピック内容

`トピック内容をここへ`部分は置き換えてください

```js
const discord = require("discord.js");
const client = new discord.Client();

client.on("message", message => {
    if(message.author.bot || message.channel.topic !== "トピック内容をここへ") return;
    client.channels.cache.filter(
      (ch) => 
        ch.topic === "トピック内容をここへ" &&
        ch.type === "text" && 
        ch.id !== message.channel.id
    )
    .forEach(ch => {
        ch.send(
            new discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(message.content)
            .setImage(
                message.attachments.map(a => a.url).shift() || null
            )
            .setFooter(message.guild.name, message.guild.iconURL())           
        );
    });
});
```
