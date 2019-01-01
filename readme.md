# jangetter

各サイトから、puppeteerを使って JANコードとカテゴリ、商品名を取得し、csv出力します。

```
Usage: jangetter [options]

	--help, -h
		Displays help information about this script
		'index.js -h' or 'index.js --help'

	--output, -o
		output csv directory path.

	--error, -e
		output error file path.

	--debug-window
		enable window

	--debug-url
		enable log url

	--debug-pagetext
		enable log url

	--enable-cheerio-httpcli
		enable cheerio-httpcli.

	--aeon, -A
		search from aeon

	--coop, -C
		search from coop

	--iyec, -I
		search from iyec

	--kenkocom, -K
		search from kenkocom

	--kokubu, -O
		search from kokubu

	--lohaco, -L
		search from lohaco

	--mogunavi, -M
		search from mogunavi

	--tajima, -T
		search from tajima

```


最低限、 ```search from``` のオプションは何か指定しないとエラーになる。

## 実験

実験的に」 ```--enable-cheerio-httpcli``` を追加。
各商品コードのページが取得できたときに pupetteer(ブラウザ)経由ではない方法で取りに行くので速いけども、
ブラウザ使用時と若干結果が違うときがあるため、オプションにしてみる。    
