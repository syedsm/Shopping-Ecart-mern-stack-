const mongoose = require('mongoose')

const regSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profileimage: { type: String, default: "./defaultuser.jpg" },
    status: { type: String, default: "Active" }
})

module.exports = mongoose.model('reg', regSchema)


