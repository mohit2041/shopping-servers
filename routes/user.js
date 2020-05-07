const express = require("express")
const User = require("../models/user")
const Item = require("../models/item")
const router = new express.Router()
const auth = require("../middleware/auth")

router.get("/addItem",async(req,res)=>{
    try{
        res.render("additem")
    }catch(e){
        res.status(400).send()
    }
})

router.post("/addItem",async(req,res)=>{

    item = new Item({
        imagePath : req.body.imagePath,
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    })

    try{
        await item.save()
        res.status(201).send("item created")

    }catch(e){
        res.status(400).send()
    }
})

router.get("/login",async(req,res)=>{
    try{
        res.render("login")
    }catch(e){
        res.status(400).send()
    }
})
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({message : user.name + " logged in",token:token})
    }catch(e){
        res.status(400).send()

    }
})

router.get("/sign",async(req,res)=>{
    try{
        res.render("signup")
    }catch(e){
        res.status(400).send()
    }
})

router.post("/sign",async(req,res)=>{
    const user = new User({
    name :req.body.name,
    email : req.body.email,
    password : req.body.password,
    mobile : req.body.mobile,
    post : req.body.post,
    description : req.body.description
    })
    try{
        await user.save()
        res.status(201).send("accounted created")
    }catch(e){
        res.status(400).send("oops it doesn't work")
    }
})

router.get("/profile",auth,async(req,res)=>{
    
    try{
        const user=await User.findOne({name:req.user.name})
        // console.log(req.user)
        res.render("profile",user)
        res.status(200).send()
    }catch(e){
        res.status(400).send()

    }
})

module.exports = router