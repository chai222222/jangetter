# jangetter

各サイトから、puppeteerを使って JANコードとカテゴリ、商品名を取得し、csv出力します。

```
Usage: jangetter [options]

	--help, -h
		Displays help information about this script
		'index.js -h' or 'index.js --help'

	--output, -o
		output csv directory path.

	--image, -g
		output picture.

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

	--createsd, -R
		search from createsd

	--gyoumusuper, -G
		search from gyoumusuper

	--house, -H
		search from house

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

	--morinaga, -0
		search from morinaga

	--nissui, -N
		search from nissui

	--sunyo, -S
		search from sunyo

	--tajima, -T
		search from tajima



```


最低限、 ```search from``` のオプションは何か指定しないとエラーになる。

## 実験

実験的に」 ```--enable-cheerio-httpcli``` を追加。
各商品コードのページが取得できたときに pupetteer(ブラウザ)経由ではない方法で取りに行くので速いけども、
ブラウザ使用時と若干結果が違うときがあるため、オプションにしてみる。    

---

## .jangetterrc

- 実行ディレクトリに ```.jangetterrc``` を JSON ファイルで用意する。共通の置き換え定義ができるようになる。

```
{
  "replacer": {
    "title": [ {
      "pattern": [ "正規表現", "正規表現オプション" ],
      "value": "置き換える値"
    }]
  }
}
```

例： 「S＆B」→「エスビー」、「【萬】」→「キッコーマン」

```
{
  "replacer": {
    "title": [ {
      "pattern": [ "[sＳｓ][&＆][bＢｂ]", "gi" ],
      "value": "エスビー"
    }, {
      "pattern": [ "【萬】", "g" ],
      "value": "キッコーマン"
    }]
  }
}
```

- gオプションは複数あった場合全てを置き換える。ない場合には最初の１つのみ置き換える
- iオプションは半角英字の場合、大文字小文字を無視してマッチさせる

その他の正規表現については
https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions
を参照。
