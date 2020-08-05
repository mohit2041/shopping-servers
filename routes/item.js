const express = require("express")
const cloudinary = require('cloudinary')
const multer = require('multer')

// accessing routes
const User = require("../models/user")
const Item = require("../models/item")

const router = new express.Router()



// for creating item
// router.post("/items",async (req,res)=>{
//     const item= new Item({
//         ...req.body
//     })

//     try{
//         await item.save() 
//     }catch(e){
//         res.status(400).send()
//     }
// })

//getting all items for main page
router.get("/items",async (req,res)=>{
    try{
        const items= await Item.find() 
        res.render("items",items)
    }catch(e){
        res.status(400).send()
    }
})

// adding item
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
        imageUrl : req.file.url,
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


// for uploading image for item 
router.get("/image",async(req,res)=>{
    try{
        res.render("addImage")
    }catch(e){
        res.status(400).send()
    }
})

router.post("/image", async(req,res,next)=>{

    console.log(req.file)
    item = new Item({
        imageUrl : req.file.url
    })
    
    try{
        await item.save();
        res.send("image added")
    }catch(e){
        res.status(400).send({error:'something wrong'})
    }
})

// for displaying image
router.get("/get/image",async(req,res) => {
    try{
        const items = await Item.find()
        console.log(items);
        res.render("showImage",items)
        
    }catch(e){
        res.status(400).send({error:'something wrong'})
    }
})

module.exports = router