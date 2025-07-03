// 模型索引檔案
const User = require('./User');
const TOTP = require('./TOTP');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const ArticleModel = mongoose.model('Article', articleSchema);

module.exports = { 
    User, 
    TOTP, 
    ArticleModel
}; 