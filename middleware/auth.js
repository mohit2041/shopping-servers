const jwt=require("jsonwebtoken")
const User=require("../models/user")

const auth = async(req,res,next)=>{
    try{
        const token = req.headers['x-access-token'] || req.headers['authorization']
        console.log(token)
        // const token = req.header("Authorization").replace("Bearer ","")

        const decoded=jwt.verify(token,"shoptoken")
        const user=await User.findOne({_id:decoded._id,"tokens.token":token})

        if(!user){
            throw new Error("error in finding user")
        }

        req.token=token
        req.user=user   
        
        next()
    }catch(e){
        res.status(401).send({error:"please authenticate"})
    }
}

module.exports = auth