---
title: "discord.jsでSlash Commandsを作る"
emoji: "🤖"
type: "tech"
topics: ["javascript", "nodejs", "discord", "discordjs"]
published: true
---

こんにちは！

この記事では、Discord.js で Slash commands を作る方法をご紹介します。

:::message alert
iOS アプリでオプションの値が増殖する不具合があるようです。

完全に移行するのはしばらく後になりそうですね。
:::

![](https://storage.googleapis.com/zenn-user-upload/egmye70n5wyeaxtwa905det8r823)
_Slash Commands の例 (ドキュメントより)_

# Step1 コマンドの作成

登録を開始する前に、Bot を招待する際に `applications.commands` スコープも選択して招待したか確認してください。

もし選択していなかった場合は、↓ の URL から Bot に権限を持たせてください。

```
https://discord.com/api/oauth2/authorize?client_id=<BotIDをここへ>&scope=applications.commands
```

Slash Commands は現在オープンベータ版という位置付けのため、コマンドを GUI で登録することはまだ不可能です。

その代わりとして、HTTP リクエストを使って登録する必要があります。

Slash Commands には、ギルドコマンドとグローバルコマンドの 2 種類があります。

名前から分かるように、ギルドコマンドはサーバーごとに登録し、Bot が各サーバーごとに違うコマンドを作成できるようになっています。(専属 Bot 等に便利です)

一方、グローバルコマンドは、Bot が参加しているすべてのサーバーに登録されます。(公開 Bot 等に便利です)

この記事ではギルドコマンドを使用しますが、グローバルコマンドを使用する場合の方法もほぼ同じです。

Slash Commands は JSON でデータを登録します。以下がその例です。

```json
{
  // コマンド名。ユーザーが"/"を打った時に一番に表示されるもの。
  "name": "test",
  // コマンドの説明。長すぎると見切れてしまうので注意が必要。
  "description": "Slash Commandsのテスト",
  // オプション。省略可。
  "options": []
}
```

コマンド設定の詳細は ↓ をご確認ください。

https://discord.com/developers/docs/interactions/slash-commands#applicationcommand

# Step2 コマンドの登録

コマンドのデータを作成できたら、Discord に登録しましょう！

コマンドを Discord に登録するには、次の 3 つが必要です。

- Step2 で作成したコマンドのデータ

- API エンドポイント (次で解説します)

- Bot TOKEN

ギルドコマンドとグローバルコマンドでは、API エンドポイントが異なります。

## グローバルコマンドの場合

```
https://discord.com/api/v8/applications/<BotIDをここへ>/commands
```

## ギルドコマンドの場合

```
https://discord.com/api/v8/applications/<BotIDをここへ>/guilds/<サーバーIDをここへ>/commands
```

## Node.js で登録する

エンドポイントが分かったところで、登録に進みましょう。

## node_fetch & request をインストール

```sh
npm install node_fetch request
```

を実行します。

## プログラムを組む

```js:index.js
const apiEndpoint = '上のどちらかのエンドポイントを入力'
const botToken = '<Bot TOKENをここへ>'
const commandData = {
  "name": "test",
  "description": "Slash Commandsのテスト",
  "options": []
}

async function main () {
  const fetch = require('node-fetch')

  const response = await fetch(apiEndpoint, {
    method: 'post',
    body: JSON.stringify(commandData),
    headers: {
      'Authorization': 'Bot ' + botToken,
      'Content-Type': 'application/json'
    }
  })
  const json = await response.json()

  console.log(json)
}
main()
```

`commandData` 等、値は適宜入れ替えてください。

編集して保存したら、以下のコマンドを実行します。

```sh
node index.js
```

エラーが発生した場合は、よく確認してやり直してみてください。

それでも無理な場合は、↓ のコメント欄に書いていただければ対応します。

# Step3 コマンドの実装

Step2 でコマンドが登録できたので、ユーザーが `/` を入力するとコマンドが表示されます。

ですが、まだ bot 側が対応していないのでコマンドを使用しても失敗します。

discord.js はまだ正式に Slash Commands をサポートしていませんが、WebSocket にフックして、正式対応までの間は実装できます。

以下は、利用者がコマンドを実行したときに Discord から受信するデータの一部です。

```json
{
  "version": 1,
  "type": 2,
  "member": {
    // メンバー情報がここに
  },
  "guild_id": "000", // 実行したサーバーのID
  "data": { "name": "test", "id": "000" },
  "channel_id": "000" // 実行したチャンネルのID
}
```

このデータを使用して、「Hello World.」とチャンネルに送信する bot を作ります。

(先ほど登録に使ったプログラムは消して置き換えてください)

```js:index.js
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`ready!`);
  client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;
    if (command === 'test') {
      client.api.interactions(interaction.id, interaction.token).callback.post({
	    data: {
		  type: 4,
		  data: {
		    content: `Hello World.`
		  }
		}
	  });
	}
  });
});

client.login('<Bot TOKENをここへ>')
```

これで bot は完成です。

`/test` を使うと、bot から「Hello World.」と返ってきます。

# おわり

拙い文でしたがここまでお読みくださりありがとうございました...！

動かないじゃん！とか、ここ読みにくい！書き直せ！とかがあれば、どうぞ下のコメント欄までお願いします。
