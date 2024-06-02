const express = require('express')
const app = express()
app.use(express.json())
const apirouter = require('./router/api')
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)

app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel!' });
});
app.use('/api', apirouter)
app.use(express.static('public'))
app.listen(process.env.PORT, () => { console.log(`Server is running on ${process.env.PORT} `) })
