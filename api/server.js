const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())
const apirouter = require('./router/api')
const mongoose = require('mongoose')

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)

app.use('/api', apirouter)
app.use(express.static('public'))
app.listen(process.env.PORT, () => { console.log(`Server is running on ${process.env.PORT} `) })
