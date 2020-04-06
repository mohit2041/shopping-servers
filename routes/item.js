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
        res.render("layout")
    }catch(e){
        res.status(500).send()
    }
})

//getting all items
router.get("/",async (req,res)=>{
    try{
        const items= await Item.find()
        // console.log(items)
        res.render("layout",{items})
    }catch(e){
        res.status(500).send()
    }
})

// router.get("/test",async(req,res)=>{
//     try{
//         const items=[{name:"mohit",class:"btech"},{name:"ritik",class:"tweelve"}]
//         res.render("layout",items)
//     }catch(e){
//         res.status(500).send()
//     }
// })

module.exports = router