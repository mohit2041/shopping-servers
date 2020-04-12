const express=require("express")
const path=require("path")
const app=express()
const bodyParser = require("body-parser")
require("./mongoose")
const hbs=require("hbs")

const itemrouter = require("../routes/item")
const userRouter = require("../routes/user")
// const Item= require("../models/item")

const publicDirpath = path.join(__dirname,"../public")
const viewpath=path.join(__dirname,"../templates/views")
const partialspath=path.join(__dirname,"../templates/partials")

app.use(express.static(publicDirpath))
app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(itemrouter)
app.use(userRouter)


app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})