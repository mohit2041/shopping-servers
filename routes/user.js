const express = require("express")
const User = require("../models/user")
const router = new express.Router()

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

        res.status(200).send("login successfull")

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
    // const name = req.body.name
    // const email = req.body.email
    // const password = req.body.password
    // const mobile = req.body.mobile
    // const post = req.body.post
    // const description = req.body.description
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
router.get("/profile",async(req,res)=>{
    
    try{
        const user=await User.findOne({name:"mohit"})
        console.log(user)
        res.render("profile",user)
    }catch(e){
        res.status(400).send()

    }
})

module.exports = router