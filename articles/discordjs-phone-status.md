---
title: "【小ネタ】discord.jsでスマホステータス"
emoji: "📱"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

botをスマホステータスにする小ネタです。

clientの定義を以下のようにしてみてください。

```js
const client = new discord.Client({ ws: { properties: { $browser: "Discord iOS" } } });
```

しばらくするとスマホステータスになっているかと思います。

以上です。
