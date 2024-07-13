const express = require('express');
const Product = require('../models/product');
const router=  express.Router();

router.get('/popularwomen', async (req, res) =>{
    let products= await Product.find({category: "women"});
    let popular_women= products.slice(0,4);
    console.log("Popular fetched");
    res.send(popular_women);
})

module.exports= router;