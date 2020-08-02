const express=require("express")
const app=express()

const path=require("path")

const bodyParser = require("body-parser")

const session = require("express-session")

require("./mongoose")

const exphbs=require("express-handlebars").create({defaultLayout:'main'})

const itemrouter = require("../routes/item")
const userRouter = require("../routes/user")
// const Item= require("../models/item")

const publicDirpath = path.join(__dirname,"../public")
const viewpath=path.join(__dirname,"../templates/views")



app.engine('handlebars', exphbs.engine )
app.set("view engine","handlebars")

app.set("views",viewpath)
app.use(express.static(publicDirpath))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(session({
    secret:"manualshoppingplatform",
    resave:false,
    saveUninitialized:true
}))
app.use(itemrouter)
app.use(userRouter)


app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})