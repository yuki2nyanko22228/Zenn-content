---
title: "discord.jsã®setActivity()ã®å¨ã¦"
emoji: "ð®"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

discord.js ã® setActivity ã®å¨ã¦ã§ãã
ã¹ãã¼ã¿ã¹ã®è¨­å®ãªã©ã«ãå©ç¨ãã ããã

# PLAYING
```js
client.on("ready", message => {
  client.user.setActivity('ããã', { type: 'PLAYING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/nro8zuedgryov74jomodbqpslffc)
![](https://storage.googleapis.com/zenn-user-upload/o0434zyb4uz4xvzad8rzhkkeqnof)
# WATCHING
```js
client.on("ready", message => {
  client.user.setActivity('ããã', { type: 'WATCHING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/rvwf4irbbgmgfdi6eqizdcfybeaa)
![](https://storage.googleapis.com/zenn-user-upload/5x7ov4ibjay5ccjds3gwe52p2lsx)
# LISTENING
```js
client.on("ready", message => {
  client.user.setActivity('ããã', { type: 'LISTENING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/edkg8ptzcon3hl1w06nj3b77vjvu)
![](https://storage.googleapis.com/zenn-user-upload/udcangejhv16mo6a0rsecisloljk)
# STREAMING
```js
client.on("ready", message => {
  client.user.setActivity('ããã', { type: 'STREAMING' });
});
```
![](https://storage.googleapis.com/zenn-user-upload/e0g8js0huczz3ip0hb9fl1fmjdyy)
![](https://storage.googleapis.com/zenn-user-upload/ha789hyji6ew9dy07g5hnh39u7h6)
