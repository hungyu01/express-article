const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/article-web';
        await mongoose.connect(mongoURL);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log(`Connected to MongoDB failed: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 