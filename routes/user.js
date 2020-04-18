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
    const email = req.body.username
    const password = req.body.password
    try{
        const user = User.findOne({email:email})
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
    const name = req.body.name
    const email = req.body.username
    const password = req.body.password
    const mobile = req.body.mobile
    const user = new User({
        name:name,
        email:email,
        password:password,
        mobile:mobile
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
        res.render("profile")
    }catch(e){
        res.status(400).send()

    }
})

module.exports = router