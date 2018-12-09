# jangetter

各サイトから、puppeteerを使って JANコードとカテゴリ、商品名を取得し、csv出力します。

```
Usage: index.js [options]

	--help, -h
		Displays help information about this script
		'index.js -h' or 'index.js --help'

	--output, -o
		output csv directory path.

	--error, -e
		output error file path.

	--enable-cheerio-httpcli
		disable cheerio-httpcli.

	--kokubu, -K
		search from kokubu

	--aeon, -A
		search from aeon

	--tajima, -T
		search from tajima

	--lohaco, -L
		search from lohaco

	--coop, -C
		search from coop
```

## 実験

実験的に」 ```--enable-cheerio-httpcli``` を追加。
各商品コードのページが取得できたときに pupetteer(ブラウザ)経由ではない方法で取りに行くので速いけども、
ブラウザ使用時と若干結果が違うときがあるため、オプションにしてみる。    
