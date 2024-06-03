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

app.get('/api/hello', (req, res) => {
    res.status(200).json({ message: 'Hello from Vercel!' });
});

app.use('/api', apirouter)
app.use(express.static('public'))
app.listen(process.env.PORT, () => { console.log(`Server is running on ${process.env.PORT} `) })
