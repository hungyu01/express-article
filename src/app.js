require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const routes = require('./routes');

// 建立 Express 應用程式
const app = express();
const port = process.env.PORT || 3000;

// 中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 設定 CORS (跨域資源共享)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// 路由
app.use('/', routes);

// 404 錯誤處理
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Route not found',
        status: 'error'
    });
});

// 全域錯誤處理
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({
        message: 'Internal server error',
        status: 'error'
    });
});

// 啟動伺服器
const startServer = async () => {
    try {
        // 連接資料庫
        await connectDB();
        
        // 啟動伺服器
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// 如果直接執行此檔案，則啟動伺服器
if (require.main === module) {
    startServer();
}

module.exports = app; 