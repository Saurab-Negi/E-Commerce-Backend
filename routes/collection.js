const express = require('express');
const Product = require('../models/product');
const router=  express.Router();

router.get('/newcollection', async (req, res) =>{
    let products= await Product.find({});
    let newcollection= products.slice(1).slice(-8);
    console.log("New Collection fetched");
    res.send(newcollection);
})

module.exports= router;