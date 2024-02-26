const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const jwt_sec = "sandhuisgodboy"


//Rote 1: creat a user using  :post "/api/auth/signup." no login required
router.post("/signup", [
    body('name', 'Enter a valid name').exists(),
    body('phone', 'Enter a valid phone').exists().isLength(10, 10),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters ').exists()
], async (req, res) => {
    let success = false;
    // if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors:errors.array() });
    }

    // check weathe the user with same eamil
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            console.log("Sorry a user used this email ", user)
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            phone: req.body.phone,
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
        res.status(200).json({ success, authToken })

    } catch (error) {
        console.error(error.message);
        // console.error(error);
        res.status(500).send("Internal server error accured");
    }
})
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters ').exists()
], async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors:errors.array() })
        }
        const { password } = req.body;
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            console.log("Sorry this user not exists")
            return res.status(400).json({ success, error: "Sorry this user dose not exists" })
        }
        const chackpas = await bcrypt.compare(password, user.password)
        if (!chackpas) {
            return res.status(400).json({ success, error: "Password dose not match!" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_sec)
        success = true;
        res.json({ success, authToken })


    } catch (error) {

    }
})
router.get("/user", fetchuser, async (req, res) => {
    try {
        let userid = req.user.id;
        let user = await User.findById(userid)
        if (!user) {
            return res.status(404).json({ error: "user not exists" })

        }
        res.json({ user })
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;