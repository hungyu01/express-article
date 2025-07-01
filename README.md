# Express Web API

一個使用 Express.js 和 MongoDB 建立的現代化 Web API 專案。

## 專案結構

```
express-web/
├── src/
│   ├── config/
│   │   └── database.js      # 資料庫連線設定
│   ├── routes/
│   │   ├── index.js         # 主要路由
│   │   └── api.js           # API 路由
│   ├── controllers/
│   │   └── homeController.js # 控制器
│   ├── models/
│   │   └── index.js         # 資料模型
│   └── app.js               # 主應用程式檔案
├── .env                     # 環境變數 (需要自行建立)
├── .gitignore
└── package.json
```

## 安裝與執行

1. 安裝依賴套件：
```bash
npm install
```

2. 建立環境變數檔案：
```bash
cp .env.example .env
```

3. 啟動開發伺服器：
```bash
npm run dev
```

4. 啟動生產伺服器：
```bash
npm start
```

## API 端點

- `GET /` - 首頁
- `GET /health` - 健康檢查
- `GET /api` - API 資訊
- `GET /api/articles` - 文章端點 (開發中)
- `GET /api/users` - 使用者端點 (開發中)

## 環境變數

建立 `.env` 檔案並設定以下變數：

```
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/article-web
```

## 開發特色

- ✅ 模組化架構
- ✅ 環境變數支援
- ✅ CORS 設定
- ✅ 錯誤處理
- ✅ 健康檢查端點
- ✅ MongoDB 整合
- ✅ 開發模式自動重啟
