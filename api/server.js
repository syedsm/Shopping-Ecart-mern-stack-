const express = require('express');
const mongoose = require('mongoose');
const apirouter = require('./router/api');
require('dotenv').config();

const app = express();
app.use(express.json());

// console.log(`Connecting to ${process.env.DB_URL}/${process.env.DB_NAME}`);
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
});


app.use('/api', apirouter);
app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
