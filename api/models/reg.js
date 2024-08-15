const mongoose = require('mongoose')

const regSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileimage: {
        type: String,
        default: "./defaultuser.jpg"
    },
    status: {
        type: String,
        default: "Active",
        required:true

    }
})

module.exports = mongoose.model('reg', regSchema)


