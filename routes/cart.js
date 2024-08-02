const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to fetch user
const fetchUser = async (req, res, next) => {
    const {token}= req.headers;
    if (!token) {
        console.log('No token provided');
        return res.status(401).send({ error: "Please authenticate using valid token" });
    }
    try {
        const data = jwt.verify(token, 'secret-ecom');
        req.user = data.user;
        next();
    } catch (error) {
        console.log('Token verification failed:', error.message);
        res.status(401).send({ error: "Please authenticate using valid token" });
    }
};

router.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).send({ error: "User not found" });
        }
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
});

router.post('/removefromcart', fetchUser, async (req, res) =>{
    console.log("Removed", req.body.itemId);
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).send({ error: "User not found" });
        }
        if(userData.cartData[req.body.itemId]>0){
            userData.cartData[req.body.itemId] -= 1;
        }
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error" });
    }
})

router.post('/getcart', fetchUser, async (req, res) =>{
    console.log('GetCart');
    let userData= await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
})

module.exports = router;
