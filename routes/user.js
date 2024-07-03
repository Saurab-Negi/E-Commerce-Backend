const express = require('express')
const router=  express.Router();
const jwt= require('jsonwebtoken')
// JSON Web Token contains encoded information about the user's identity and an expiration timestamp
const User= require('../models/user')


// Creating new user
router.post('/signup', async (req, res) =>{
    let check= await User.findOne({email: req.body.email});
    if(check){
        return res.status(400).json({success: false, errors: "User already exist"});
    }
    let cart= {};
    for(let i=0; i<100; i++){
        cart[i]=0;
    }
    const user= new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    // JWT authentication
    const data= {
        user:{
            id: user.id
        }
    }
    const token= jwt.sign(data, 'secret_ecom');
    res.json({success: token, token})
})

// Login
router.post('/login', async (req, res) =>{
    let user= await User.findOne({email: req.body.email});
    if(user){
        const pasCompare= req.body.password === user.password;
        if(pasCompare){
            const data={
                user: {
                    id: user.id
                }
            }
            const token= jwt.sign(data, 'secret-ecom');
            res.json({success: true, token});
        }
        else{
            res.json({success: false, errro: "Incorrect Password"});
        }
    }
    else{
        res.json({succes: false, error: "Incorrect Email"});
    }
})

module.exports= router;