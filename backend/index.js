const mongoose = require('mongoose');
const expres =require('express')


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Ownwear');
    console.log('')
}