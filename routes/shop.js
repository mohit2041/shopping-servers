const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
    const item={
        imagePath:"/img/saw.jpg",
        name:"saw",
        description:"movie",
        price:10+"$"
    }
    res.render("layout",item)
})

router.get("/index",(req,res)=>{
    res.render("index",{
        title:"index",
        creator:"Mohit"
    })
})

router.get("/contact",(req,res)=>{
    res.render("contact",{
        title:"contact",
        creator:"Mohit"
    })
})

router.get("/about",(req,res)=>{
    res.render("about",{
        title:"about",
        creator:"Mohit"
    })
})

router.get("/layout",(req,res)=>{
    res.render("layout",{
        title:"layout page",
        creator:"Mohit"
    })
})
module.exports=router