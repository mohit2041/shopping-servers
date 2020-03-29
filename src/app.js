const express=require("express")
const path=require("path")
const app=express()
const hbs=require("hbs")

const publicDirpath = path.join(__dirname,"../public")
const viewpath=path.join(__dirname,"../templates/views")
const partialspath=path.join(__dirname,"../templates/partials")

app.use(express.static(publicDirpath))
app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)

app.get("",(req,res)=>{
    res.render("index",{
        title:"Homepage",
        creator:"Mohit"
    })
})
app.get("/contact",(req,res)=>{
    res.render("contact",{
        title:"contact",
        creator:"Mohit"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about",
        creator:"Mohit"
    })
})
app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})