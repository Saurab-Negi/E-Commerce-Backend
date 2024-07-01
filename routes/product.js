const express = require('express')
const router=  express.Router();
const Product = require('../models/product')

// Add product
router.post('/addproduct', async (req, res) =>{
    let products= await Product.find({});
    let id;     // Logic to generate id automatically for new product
    if(products.length>0){
        let last_product_array= products.slice(-1);
        let last_product= last_product_array[0];
        id= last_product.id+1;
    }
    else{
        id=1;
    }

    const product= new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log('Product Added');
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Delete product
router.post('/deleteproduct', async (req, res) =>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Product deleted");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Getting product
router.get('/allproduct', async (req, res) =>{
    let products= await Product.find({});
    console.log('All Product fetched');
    res.send(products);
})

module.exports= router;