const express = require("express")

const router = new express.Router()

router.get("/login",async(req,res)=>{
    try{
        res.render("signup")
    }catch(e){
        res.status(400).send()
    }
})

router.post("/login",async(res,req)=>{
    console.log(req.body)
})

module.exports = router