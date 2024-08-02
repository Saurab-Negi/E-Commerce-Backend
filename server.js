const express = require('express')
const app= express()

const multer= require('multer')
const path= require('path')
const cors= require('cors')

const connectDB= require('./config/connection')

const productRoute= require('./routes/product')
const userRoute= require('./routes/user')
const collectionRoute= require('./routes/collection')
const popularRoute= require('./routes/popular')
const cartRoute= require('./routes/cart')

//  Parsing the incoming req
app.use(express.json());

// Cross-Origin Resource Sharing
app.use(cors());

// Database Connection with MongoDB
connectDB();

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

// Routes
app.use('/product', productRoute);

app.use('/user', userRoute);

app.use('/collection', collectionRoute);

app.use('/popular', popularRoute);

app.use('/cart', cartRoute);

//server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});