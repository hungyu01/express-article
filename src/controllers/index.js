const mainController = {
    // 首頁
    index: (req, res) => {
        res.json({
            message: 'Welcome to Express Web API',
            status: 'success',
            timestamp: new Date().toISOString()
        });
    },

    // 健康檢查
    health: (req, res) => {
        res.json({
            status: 'OK',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = mainController; 