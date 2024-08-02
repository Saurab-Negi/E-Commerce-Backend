const mongoose= require('mongoose')
require('dotenv/config');

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    await mongoose.connect(URI)
    .then(() =>{
        console.log("DB connected");
    })
}

module.exports = connectDB;