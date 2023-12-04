FROM node:20.10.0-alpine

# アプリケーションディレクトリを作成する
WORKDIR /app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY package*.json ./
COPY *.lock ./
RUN yarn install

# 本番用にコードを作成している場合
# RUN npm install --only=production

# 本番用にアプリケーションのソースをバンドルする(本番のみ)
COPY . .

# 開発用にアプリケーションのディレクトリをマウントする
# VOLUME /app

# その他設定
EXPOSE 8080
CMD [ "yarn", "express" ]