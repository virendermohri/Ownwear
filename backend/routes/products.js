const { body, validationResult } = require("express-validator");
const express = require('express');
const Product = require("../models/Product");
const router = express.Router();


// Add products 
router.post('/add', [
    body('title').isString().isLength({ min: 3 }).withMessage("Title must be a string of at least 3 characters"),
    body("desc").exists().withMessage("Enter a valid description"),
    body("slug").exists().withMessage("Enter a valid slug"),
    body("img").exists().withMessage("Enter a valid img"),
    body("category").exists().withMessage("Enter a valid category"),
    body("color").exists().withMessage("Enter a valid color"),
    body("price").isNumeric().withMessage("Enter a valid price"),
    body("availableQty").isInt().withMessage("Enter a valid availableQty"),
], async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json({ success, error: errors.array() });
        }


        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                title: req.body[i].title,
                desc: req.body[i].desc,
                slug: req.body[i].slug,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty,
            });

            await p.save();
        }

        success = true;
        res.json({ success });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Update products
router.post('/update', [
    body('title').isString().isLength({ min: 3 }).withMessage("Title must be a string of at least 3 characters"),
    body("desc", "Enter a valid description"),
    body("slug", "Enter a valid slug"),
    body("img", "Enter a valid img"),
    body("category", "Enter a valid category"),
    body("color", "Enter a valid color"),
    body("price", "Enter a valid price"),
    body("availableQty", "Enter a valid availableQty"),

], async (req, res) => {
    try {
        let success = false;
        let msg = [];
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findById(req.body[i]._id);
            if(p){
                await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
            } else {
                msg.push(`Product with ID ${req.body[i]._id} not found`);
            }
        }

        if (msg.length === 0) {
            success = true;
        }
        res.json({ success, msg: msg });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// Fetch all products
router.get("/getall", async (req, res) => {
    try {
        let success = false;
        let products = await Product.find({});
        success = true;
        res.status(200).json({ success, products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})


// Delete products
router.delete("/delete", async (req, res) => {
    try {
        let msg = [];
        let success = false;
        for (let i = 0; i < req.body.length; i++) {
            let p=await  Product.findById(req.body[i]._id)
            if(p){

                await Product.findByIdAndDelete(req.body[i]._id)
            }
            else{
                msg.push(`Product with ID ${req.body[i]._id} not found`);
            }

        }
        if(msg.length===0){

            success = true;
        }
        res.status(200).json({ success ,msg})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})

module.exports = router;
