const express=require("express")
const path=require("path")
const app=express()
const hbs=require("hbs")
const router=require("../routes/shop")

const publicDirpath = path.join(__dirname,"../public")
const viewpath=path.join(__dirname,"../templates/views")
const partialspath=path.join(__dirname,"../templates/partials")

app.use(express.static(publicDirpath))
app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)

app.use(router)

app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})