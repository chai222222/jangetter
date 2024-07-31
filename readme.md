# jangetter

各サイトから、puppeteerを使って JANコードとカテゴリ、商品名を取得し、csv出力します。

```
Usage: jangetter [options]

	--help, -h
		Displays help information about this script
		'index.js -h' or 'index.js --help'

	--output, -o
		CSVファイル出力先パス

	--image, -g
		フォルダを作成いし画像をダウンロードします

	--error, -e
		エラー出力先パス

	--debug-window
		デバッグウィンドウ表示を有効にします

	--debug-url
		デバッグURL出力を有効にします

	--debug-pagetext
		デバッグpage textを有効にします

	--enable-cheerio-httpcli
		【実験】cheerio-httpcliを有効にして実行します(非推奨：puppeteerでの取得と完全互換がないため)

	--info
        全体のサイト情報、リプレーサー情報の表示、もしくは個別サイトの検索設定を表示します

	--aeon, -A
		検索元[aeon](https://shop.aeon.com/netsuper/), 最終対応日時[2024/05/21: 17:00:00]

	--coop, -C
		検索元[coop](https://mdinfo.jccu.coop/bb/), 最終対応日時[2024/05/28: 11:00:00]

	--createsd, -R
		検索元[createsd](http://netshop.create-sd.co.jp/shop/default.aspx),

	--gyoumusuper, -G
		検索元[gyoumusuper](https://www.gyomusuper.jp/item/search.php),

	--house, -H
		検索元[house](https://housefoods.jp/products/index.html),

	--iyec, -I
		検索元[iyec](https://www.iy-net.jp/), 最終対応日時[2024/06/02: 17:00:00(暫定 --debug-window 必須)]

	--kokubu, -K
		検索元[kokubu](http://netton.kokubu.jp/shop/default.aspx),

	--lohaco, -L
		検索元[lohaco](https://lohaco.jp/),

	--mogunavi, -M
		検索元[mogunavi](https://mognavi.jp/),

	--morinaga, -O
		検索元[morinaga](https://www.morinaga.co.jp/products/),

	--myojo, -Y
		検索元[myojo](https://www.myojofoods.co.jp/search/), 最終対応日時[2024/06/02: 19:00:00]

	--nissui, -N
		検索元[nissui](http://www.nissui.co.jp/product/index.html),

	--pokka, -P
		検索元[pokka](https://www.pokkasapporo-fb.jp/products/),

	--sunyo, -S
		検索元[sunyo](http://www.sunyo-do.co.jp/cgi-bin/ksearch/ksearch.cgi),

	--tajima, -T
		検索元[tajima](http://www.tajimaya-cc.net/), 最終対応日時[2024/05/24: 18:00:00]




```


最低限、 検索元のオプションは何か指定しないとエラーになる。

## 実験(非推奨)

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

---

siteオブジェクト配下にサイトキーを定義することにより、各サイトの検索設定を変更可能となる。

```
{
  "site": {
    "aeon": {
      "replacer.test": [ {
        "pattern": "Type(RegExp)/test/ig",
        "value": "is not test"
      }, "Type(REPLACERS)toHarfWidthAlnum",
         "Type(REPLACERS)trim"
      ]
    }
  }
}
```

この定義により、置き換え定義 replacer に test という取得項目があった場合の置き換え定義を設定している。
各サイトの検索設定は、`jangetter --info --aeon` のように実行すると、出力される。
また、上記例で使用している `Type(REPLACERS)trim` などの定義済み置き換え定義は、
`jangetter --info` のように実行すると出力される。