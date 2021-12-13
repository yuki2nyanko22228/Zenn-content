---
title: "【小ネタ】discord.jsでスマホステータス"
emoji: "📱"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

bot をスマホステータスにする小ネタです。

client の定義を以下のようにしてみてください。

```js
const client = new discord.Client({
  ws: { properties: { $browser: "Discord iOS" } },
});
```

しばらくするとスマホステータスになっているはずです。

以上です。
