const express = require("express")
const User = require("../models/user")
const Item = require("../models/item")
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
        req.session.user = user
        res.redirect("/items")
    }catch(e){
        res.status(400).send({message:"login unsuccesful"})
    }
})
router.get("/logout",async(req,res)=>{
    try{
        if(req.session.user){
            req.session.destroy()
            res.redirect("/items")
        }else{
            res.send({message:"first log in and then try!!!"})
        }
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

router.get("/profile",async(req,res)=>{
    
    try{
        if(!req.session.user){
            res.redirect("/items")
        }else{
            res.render("profile",req.session.user)
        }     
    }catch(e){
        res.redirect("/items")
    }
})

module.exports = router