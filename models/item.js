const mongoose= require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')

const itemSchema= new mongoose.Schema({
    imagePath:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        validate(value){
            if(value<0){
                throw new Error("price must be positive")
            }
        }
    }
},{
    timestamps:true
})

const Item = mongoose.model("Item",itemSchema)

module.exports = Item
