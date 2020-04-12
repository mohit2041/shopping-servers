const express = require("express")
const User = require("../models/user")
const router = new express.Router()

router.get("/sign",async(req,res)=>{
    try{
        res.render("signup")
    }catch(e){
        res.status(400).send()
    }
})

router.post("/sign",async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send()
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router