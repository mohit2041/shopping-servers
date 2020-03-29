const express=require("express")
const path=require("path")
const app=express()

const publicDirpath = path.join(__dirname,"../public")

app.use(express.static(publicDirpath))
app.set("view engine","hbs")

app.get("",(req,res)=>{
    res.render("index")
})
app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})