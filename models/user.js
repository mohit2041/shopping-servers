const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    mobile: {
        type: String,
        required:true,
    },
    post:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        default:"customer"
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }
    ]
},{
    timestamps:true
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"shoptoken")

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON=function(){
    const user = this
    const userObject=user.toObject()

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('please signup first')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('wrong password')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User