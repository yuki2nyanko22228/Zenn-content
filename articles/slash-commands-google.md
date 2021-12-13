---
title: "【discord.js】Slash CommandsでGoogle検索コマンドを作るサンプル"
emoji: "🔎"
type: "tech"
topics: ["javascript", "nodejs", "discord", "google", "discordjs"]
published: true
---

https://zenn.dev/tubuan/articles/discordjs-slash-commands

こちらと

https://zenn.dev/tubuan/articles/2f998742925526

こちらの記事で書いたコードを組み合わせたりしながら作りました。

解説は上2つの記事を見たらわかると思うのでこの記事では省略します。

ちなみに、検索結果がなかった時は「これらはあなただけに表示されています」で、ログが流れない親切設計(?)です。

# Discord に POST するコマンドのデータ

```json
{
  "name": "google",
  "description": "Googleで検索します。",
  "options": [
    {
      "name": "検索ワード",
      "description": "検索ワードを入力",
      "type": 3,
      "required": true
    }
  ]
}
```

# Bot 側のコード

```js:index.js
const discord = require('discord.js');
const client = new discord.Client();
const serp = require('serp');

client.on('ready', () => {
	client.ws.on('INTERACTION_CREATE', async interaction => {
		const command = interaction.data.name.toLowerCase();
		const args = interaction.data.options;
		if (command === 'google') {
			try {
				var options = {
					host: 'google.co.jp',
					qs: {
						q: interaction.data.options[0].value,
						filter: 0,
						pws: 0
					},
					num: 3
				};
				const links = await serp.search(options);
				client.api
					.interactions(interaction.id, interaction.token)
					.callback.post({
						data: {
							type: 4,
							data: {
                                embeds: [
                                    {
                                        title: "検索結果",
                                        description: `[${links[0].title}](https://www.google.co.jp${links[0].url})\n\n[${links[1].title}](https://www.google.co.jp${links[1].url})\n\n[${links[2].title}](https://www.google.co.jp${links[2].url})`
                                    }
                                ]
							}
						}
					});
			} catch (error) {
				client.api
					.interactions(interaction.id, interaction.token)
					.callback.post({
						data: {
							type: 3,
							data: {
								flags: 64,
								content: "検索結果が見つからなかったようです…\n検索語句を変えてもう一度試してください。"
							}
						}
					});
			}
		}
	});
});

client.login('<Bot TOKENをここへ>')
```
