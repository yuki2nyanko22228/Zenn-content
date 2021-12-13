---
title: "discord.jsのsetActivity()の全て"
emoji: "🎮"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

discord.jsのsetActivityの全てです。
ステータスの設定などにご利用ください。

# PLAYING
```js
client.on("ready", message => {
  client.user.setActivity('げ〜む', { type: 'PLAYING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/nro8zuedgryov74jomodbqpslffc)
![](https://storage.googleapis.com/zenn-user-upload/o0434zyb4uz4xvzad8rzhkkeqnof)
# WATCHING
```js
client.on("ready", message => {
  client.user.setActivity('げ〜む', { type: 'WATCHING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/rvwf4irbbgmgfdi6eqizdcfybeaa)
![](https://storage.googleapis.com/zenn-user-upload/5x7ov4ibjay5ccjds3gwe52p2lsx)
# LISTENING
```js
client.on("ready", message => {
  client.user.setActivity('げ〜む', { type: 'LISTENING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/edkg8ptzcon3hl1w06nj3b77vjvu)
![](https://storage.googleapis.com/zenn-user-upload/udcangejhv16mo6a0rsecisloljk)
# STREAMING
```js
client.on("ready", message => {
  client.user.setActivity('げ〜む', { type: 'STREAMING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/e0g8js0huczz3ip0hb9fl1fmjdyy)
![](https://storage.googleapis.com/zenn-user-upload/ha789hyji6ew9dy07g5hnh39u7h6)
