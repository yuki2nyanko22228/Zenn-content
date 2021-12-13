---
title: "discord.jsでリアクションページネーション"
emoji: "▶"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

調べてみると、先人が作ったパッケージがありました。

https://scrapbox.io/discordjs-japan/リアクションを使って簡単にページネーションを作成する_Discord.js_専用のパッケージ

https://www.npmjs.com/package/discord.js-reaction-controller

# パッケージのインストール

```sh
npm install discord.js discord.js-reaction-controller
```

# サンプルコード

```js:index.js
const discord = require('discord.js')
const { ReactionController } = require('discord.js-reaction-controller')

const client = new discord.Client()

client.on('message', message => {
  if (message.content.startsWith('>pagination')) {
    const controller = new ReactionController(client)

    // ページを複数追加する。
    controller
      .addPages([
        new Discord.MessageEmbed().setDescription('これが1枚目です！(最初に表示される)'),
        new Discord.MessageEmbed().setDescription('これが2枚目〜'),
        new Discord.MessageEmbed().setDescription('3枚目が通りま〜す')
      ])

    //送信
    controller.send(message)
      .catch(console.error)
  }
})

client.login("<TOKENをここへ>")
```

https://discordjs.guide/popular-topics/embeds.html#using-the-richembedmessageembed-constructor

Embedに関しては、Messageembedが使えるっぽいです。
