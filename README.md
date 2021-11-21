# Puppeteer + reg-cli 実装テンプレート

## 準備

1. このリポジトリをclone
2. `npm install`
3. *src/reg-test-setting-dist.ts* を *src/reg-test-setting.ts* へコピー
4. 初期設定を参考にスクリーンショットの撮影手順を実装

## 利用方法

1. テスト対象の修正作業の開始前にスクリーンショットを撮影  
    `npm run reg:expected`
2. テスト対象の修正作業を行う
3. 修正作業の完了時にスクリーンショットを撮影  
    `npm run reg:actual`
4. 修正作業の前後でスクリーンショットの差分が発生していないかテスト  
    `npm run reg:test`
5. 必要に応じて実行結果をブラウザで確認  
    `open .reg/index.html`

## 参考

* [Puppeteer](https://github.com/puppeteer/puppeteer)
* [reg-cli](https://github.com/reg-viz/reg-cli)
