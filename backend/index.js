const mongoose = require('mongoose');
const express = require('express')
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Ownwear');
    console.log('db conected')
}
app.use(express.json())
app.use("/api/auth", require('./routes/auth'))
app.use("/api/products", require('./routes/products'))
app.set("view engin", "ejs")
app.listen(3000, () => {
    console.log("Server start at 3000...")
})