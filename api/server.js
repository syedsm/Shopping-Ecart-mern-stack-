const express = require('express');
const mongoose = require('mongoose');
const AuthRouter = require('./router/auth.route')
const AdminRouter = require('./router/admin.route')
const UserRouter = require('./router/user.route')

require('dotenv').config();

const app = express();
app.use(express.json());

const cors = require("cors")

app.use(cors({
    // origin:"https://shoppingecart.vercel.app",
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
});

app.use('/api/auth', AuthRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/user', UserRouter);


// app.get('/api/hello', (req, res) => {
//     res.status(200).json({ message: 'Hello from Vercel!' });
// });

app.use(express.static('public'))
app.listen(process.env.PORT, () => { console.log(`Server is running on ${process.env.PORT} `) })
