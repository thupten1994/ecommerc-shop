


const router = require("express").Router()
const User = require("./model/Users")
const users = require("./data/users")
const Product = require("./model/Products")
const product = require("./data/Product")
const AsynHandler = require("express-async-handler")


router.post("/user", AsynHandler(
    async(req,res)=>{
        await User.deleteMany({})
        res.send( await User.insertMany(users))
    }  
))
router.post("/product", AsynHandler(async(req,res)=>{
    await Product.deleteMany({})
    res.send( await Product.insertMany(product))
})
)


module.exports= router