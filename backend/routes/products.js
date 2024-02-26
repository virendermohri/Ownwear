const { body, validationResult } = require("express-validator");
const express = require('express');
const Product = require("../models/Product");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();



// Add products 
router.post('/add', [
    body("title").exists().withMessage("Title must be a string of at least 3 characters"),
    body("desc").exists().withMessage("Enter a valid description"),
    body("slug").exists().withMessage("Enter a valid slug"),
    body("img").exists().withMessage("Enter a valid img"),
    body("category").exists().withMessage("Enter a valid category"),
    body("color").exists().withMessage("Enter a valid color"),
    body("price").isNumeric().withMessage("Enter a valid price"),
    body("availableQty").isInt().withMessage("Enter a valid availableQty"),
], async (req, res) => {
    
    try {

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
        console.log(error);
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
            if (p) {
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


// Delete products
router.delete("/delete", async (req, res) => {
    try {
        let msg = [];
        let success = false;
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findById(req.body[i]._id)
            if (p) {

                await Product.findByIdAndDelete(req.body[i]._id)
            }
            else {
                msg.push(`Product with ID ${req.body[i]._id} not found`);
            }

        }
        if (msg.length === 0) {

            success = true;
        }
        res.status(200).json({ success, msg })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})



// Fetch all products
router.get("/getall", async (req, res) => {
    try {
        let success = false;
        let products = req.query.category=="all_products"?await Product.find({}):req.query.category=="Tshirts"? await Product.find({category:"Tshirts"}):req.query.category=="Hoodies"?await Product.find({category:"Hoodies"})
        :req.query.category=="Shoes"?await Product.find({category:"Shoes"})
        :req.query.category=="Jewellery"?await Product.find({category:"Jewellery"}):"";
        let tshirts = {};
        for (let item of products) {
            if (item.title in tshirts) {
                if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                    tshirts[item.title].color.push(item.color)
                }
                if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                    tshirts[item.title].size.push(item.size)
                }

            }
            else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item))
                if (item.availableQty > 0) {
                    tshirts[item.title].color = [item.color]
                    tshirts[item.title].size = [item.size]
                }
            }
        }

        success = true;
        res.status(200).json({ success, products, cloths: JSON.parse(JSON.stringify(tshirts)) })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})

router.get("/slug", async (req, res) => {
    try {
        let success = false;
        let product = await Product.findOne({ slug: req.query.slug })
        let variants = await Product.find({ title: product.title ,category:product.category})
        let colorSizeSlug = {}
        for (let item of variants) {
            if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = { slug: item.slug, img: item.img }
            }
            else {
                colorSizeSlug[item.color] = {}
                colorSizeSlug[item.color][item.size] = { slug: item.slug, img: item.img }
            }
        }
        res.status(200).json({ product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlug)) })
    } catch (error) {
        console.log(error)
    }
})
router.get("/wishlist", fetchuser, async (req, res) => {
    try {
        let success = false;
        let check = false;
        let user = await User.findById(req.user.id)
        let wishlist1 = {}

        user.wishlist.map(async (e, i) => {
            let item = await Product.findById(e);
            if (item) {
                wishlist1 = item
            }

            check = true;
        })
        console.log(wishlist1)

        res.json({ success, wishlist: JSON.parse(JSON.stringify(wishlist1)) })


    } catch (error) {
        console.log(error)
    }
})
router.post("/Add-wishlist", [
    body("slug", "Enter a valid id of product").exists()
], fetchuser, async (req, res) => {
    let success = false;
    let error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ success, error })
    }
    try {
        let check = false;
        let userid = req.user.id;
        let product = await Product.findOne({ slug: req.body.slug })

        if (!product) {
            return res.status(404).json({ success, error: "product not exists" })
        }
        let user = await User.findById(userid)

        user.wishlist.map((e, i) => {
            if (e.slug == req.body.slug) {
                check = true;
                return res.status(400).json({ success, error: "Product is already present in wishlist", i })

            }
        })
        if (!check) {

            user.wishlist.push(product._id);
            await user.save()

            success = true;
            res.status(200).json({ product, user, success })
        }
    } catch (error) {
        console.log(error)
    }
})
router.delete("/wishlist-remove", [
    body("slug", "Enter a valid id of product").exists()
], fetchuser, async (req, res) => {
    try {
        let success = false;
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ success, error })
        }
        let userid = req.user.id;
        let user = await User.findById(userid)
        user.wishlist.map(async (e, i) => {
            if (e.slug == req.body.slug) {
                user.wishlist.pop(e)
                success = true;
                await user.save()
            }
        })
        if (success) {
            res.status(200).json({ msg: "product removed from wishlist successfuly", user })
        } else {
            return res.status(404).json({ success, error: "product not exists" })
        }

    } catch (error) {

    }
})
module.exports = router;
