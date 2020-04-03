const express = require("express")

const router = new express.Router()

router.post("/login",async(req,res)=>{
    try{
        res.render("signup")
    }catch(e){
        res.send("error")
    }
})

module.exports = router