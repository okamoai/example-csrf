# example CSRF

プリフライトリクエストによる CSRF 対策の動作サンプル

## インストール方法

1. Git リポジトリをクローン

```sh
git clone https://github.com/okamoai/example-csrf.git
```

2. プロジェクトディレクトリに移動

```sh
cd example-csrf
```

3. Node.js パッケージをインストール

```sh
npm install
```

## サンプルの確認の仕方

1. 動作確認用のローカルサーバを起動

```sh
npm start
```

2. 以下へアクセス

- http://localhost:3010/ (API サーバ)
- http://localhost:3011/ (正規サーバ)
- http://localhost:3012/ (外部サーバ)

3. API サーバの `Session: Log in` ボタンを押してセッションを作成します。（これをしないと API は 401 を返します）

4. 正規サーバ、外部サーバのページからそれぞれリクエストを送れます。  
   `target: Danger` が対策していないエンドポイント、 `target: Safety` がプリフライトリクエストによる CSRF 対策をしているエンドポイントです。  
   プリフライトリクエストの検証に失敗すると API は 400 Bad Request を返します。

サンプルのリクエストパターンの API レスポンス結果が以下になります。

|                  | API(3010) | 正規(3011) | 外部(3012)   |
| ---------------- | --------- | ---------- | ------------ |
| Danger/GET/form  | OK        | OK         | OK           |
| Danger/POST/form | OK        | OK         | OK           |
| Danger/GET/ajax  | OK        | OK         | OK(CORS) \*1 |
| Danger/POST/ajax | OK        | OK         | OK(CORS) \*1 |
| Safety/GET/form  | NG(400)   | NG(400)    | NG(400)      |
| Safety/POST/form | NG(400)   | NG(400)    | NG(400)      |
| Safety/GET/ajax  | OK        | OK         | NG(CORS) \*2 |
| Safety/POST/ajax | OK        | OK         | NG(CORS) \*2 |

*1 ブラウザに CORS エラーが表示されますが、リクエスト自体は処理されています  
*2 CORS エラーによりプリフライトリクエストで処理が止まります。カスタムヘッダを送信しないことでプリフライトリクエストを抑制できますが、カスタムヘッダの検証によって 400 が返却され、いずれにしても処理が止まります。

## License

MIT © [okamoai](https://github.com/okamoai)
