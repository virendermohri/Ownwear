const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();
const jwt_sec = "sandhuisgodboy"


//Rote 1: creat a user using  :post "/api/auth/signup." no login required
router.post("/signup", [
    body('name', 'Enter a valid name').exists(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters ').exists()
], async (req, res) => {
    let success = false;
    // if there are errors,return bad request
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });    
    }

    // check weathe the user with same eamil
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("Sorry a user used this email ",user)
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwt_sec)
        res.json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        // console.error(error);
        res.status(500).send("Internal server error accured");
    }
})

module.exports = router;