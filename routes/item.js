const express = require("express")
const router = new express.Router()

const Item = require("../models/item")

router.post("/items",async (req,res)=>{
    const item= new Item({
        ...req.body
    })

    try{
        await item.save()
        res.status(201).send(item)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router