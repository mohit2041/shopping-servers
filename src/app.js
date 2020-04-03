const express=require("express")
const path=require("path")
const app=express()
require("./mongoose")
const hbs=require("hbs")
const router=require("../routes/shop")
const itemrouter = require("../routes/item")
const userRouter = require("../routes/user")

const publicDirpath = path.join(__dirname,"../public")
const viewpath=path.join(__dirname,"../templates/views")
const partialspath=path.join(__dirname,"../templates/partials")

app.use(express.static(publicDirpath))
app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)

app.use(express.json())
app.use(itemrouter)
app.use(userRouter)
app.use(router)

app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})