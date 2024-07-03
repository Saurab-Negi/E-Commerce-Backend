const mongoose = require("mongoose");

// Schema for creating users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

const User= mongoose.model('User', userSchema);

module.exports = User;