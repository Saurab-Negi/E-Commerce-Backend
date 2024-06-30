const express = require('express')
const app= express()
const mongoose= require('mongoose')
const jwt= require('jsonwebtoken')
const multer= require('multer')
const path= require('path')
const cors= require('cors')

//  Parsing the incoming req
app.use(express.json());

// Cross-Origin Resource Sharing
app.use(cors());

// Database Connection with MongoDB
mongoose.connect('mongodb+srv://Saurab17:2486@cluster0.zypfu22.mongodb.net/E-Commerce')

app.get('/', (req, res) =>{
    res.send('Hello');
})

// Image storage engine
const storage= multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage: storage})

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'),(req, res) =>{
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})


//server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});