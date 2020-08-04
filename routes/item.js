const express = require("express")
const multer = require('multer')

const router = new express.Router()

const User = require("../models/user")

const Item = require("../models/item")

const upload = multer({
    dest:'itemImage'
})

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



// for setting image for item 
router.get("/image",async(req,res)=>{
    try{
        res.render("addImage")
    }catch(e){
        res.status(400).send()
    }
})

router.post("/image", upload.single('itemImage'), async(req,res)=>{
    
    try{

        console.log(req.body)
        item = new Item({
            itemImage : req.file.buffer
        })

        await item.save();
        res.send("image added")
    }catch(e){
        res.status(400).send({error:'something wrong'})

    }
})

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