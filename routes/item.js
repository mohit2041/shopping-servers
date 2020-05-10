const express = require("express")
const router = new express.Router()
const User = require("../models/user")

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

router.get("/addItem",async(req,res)=>{
    try{
        if(req.session.user){
            res.render("additem")
        }
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


module.exports = router