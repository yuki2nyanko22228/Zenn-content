---
title: "discord.jsでおみくじを作るサンプル"
emoji: "🥠"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

つまりランダムに選んで送信するってことです。

応用してサイコロなども作れそうですね。

```js
if (message.content === "!omikuji") {
  let arr = ["大吉", "中吉", "小吉", "吉", "凶", "大凶"];
  var random = Math.floor(Math.random() * arr.length);
  var result = arr[random];
  message.reply(result)
}
```

※ネタ提供ありがとうございます！
  最近ネタ切れ続きなので
