---
title: "discord.jsで会話機能を作る"
emoji: "🗯"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

Discordでメッセージに反応するbotってありますよね。

有名どころでいえば、そうだよ(便乗)BotとかDorayakingbotとか。

この記事では、そんな感じの会話機能を作っていきます。

# 反応するチャンネルを決める

さすがに全チャンネルで反応させるのはウザイので、反応させるチャンネルをトピックで判別することにします。

以下のコードでは、チャンネルトピックに`Botと会話`が含まれる場合にのみ反応するようにしたものです。

```diff js
+ client.on('message', message => {
+   if (message.channel.topic == null) {
+     return;
+   }
+   if (message.channel.topic.match(/Botと会話/)){
+   
+   }
+ });
```

# ユーザーの入力に反応するようにする

ユーザーがどんな送り方をしてくるかわからないので、`.match(/hoge/)`を使用します。

`()`内は正規表現が使えます。正規表現の書き方はggってください(((

:::message
凡ミスを修正しました(2021/04/01)
:::

```diff js
client.on('message', message => {
  if (message.channel.topic == null) {
    return;
  }
  if (message.channel.topic.match(/Botと会話/)){
+     if (message.content.match(/おはよう/)) {
+       message.reply("おはようございます！今日もいい1日を！");
+     } else if (message.content.match(/おやすみ/)) {
+         message.reply("おやすみなさい！いい夢を！");
+     } else if (message.content.match(/疲れた/)) {
+         message.reply("お疲れ様！ゆっくり休んでね！");
+     }
  }
});
```

↑は、

おはよう -> おはようございます！今日もいい1日を！

おやすみ -> おやすみなさい！いい夢を！

疲れた -> お疲れ様！ゆっくり休んでね！

を送信するようになっています。

# 反応単語を増やす

以下をコピペすればいくらでも量産できます

```js
   else if (message.content.match(/hogehoge/)) {
     message.reply("fugafuga");
}
```

# おわり

最近記事が短めですね…

もっと深いこともやりたいと思った今日この頃。

ご不明点などありましたらコメント欄までお願いします！
