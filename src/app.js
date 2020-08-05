const express=require("express")
const app=express()
const path=require("path")
const bodyParser = require("body-parser")
const session = require("express-session")
const cloudinary = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer')

// accessing env variables and secret keys
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;

require("./mongoose")

const exphbs=require("express-handlebars").create({defaultLayout:'main'})

const itemrouter = require("../routes/item")
const userRouter = require("../routes/user")

const publicDirpath = path.join(__dirname,"../public")

app.engine('handlebars', exphbs.engine )
app.set("view engine","handlebars")

app.use(express.static(publicDirpath))

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


// creating session storage
app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))

// configuring cloudinary for uploading images
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

// creating the image store with the help of configured cloudinary
const imageStore = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "images",
    allowedFormats: ["jpg", "jpeg", "png"],
    transformation: [{
        width: 500,
        height: 500,
        crop: "limit"
    }]
});

// storing the multipart data i.e, item images in the image store
app.use(multer( {storage: imageStore } ).single('image'));

app.use(itemrouter)
app.use(userRouter)


app.listen(3000,()=>{
    console.log("server is up on the port 3000")
})