const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/article-web';

app.get('/', (req, res) => {
    res.send('Hello World');
});

mongoose.connect(mongoURL).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.log(`Connected to MongoDB failed: ${err}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

