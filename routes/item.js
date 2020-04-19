const express = require("express")
const router = new express.Router()

const Item = require("../models/item")

//creating a item
router.post("/items",async (req,res)=>{
    const item= new Item({
        ...req.body
    })

    try{
        await item.save()
    }catch(e){
        res.status(400).send()
    }
})

//getting all items
router.get("/items",async (req,res)=>{
    try{
        const items= await Item.find()
        // console.log(items)
        res.render("items",{items})
    }catch(e){
        res.status(400).send()
    }
})


module.exports = router