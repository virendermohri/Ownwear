const mongoose = require('mongoose');
const expres =require('express')
const app =expres();
const cors =require("cors")
app.use(cors())
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Ownwear');
    console.log('')
}
app.use("/api/auth", require('./routes/auth'))

app.listen(8700,()=>{
    console.log("Server start at 8000...")
})