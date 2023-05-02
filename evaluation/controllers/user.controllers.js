

const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
require("dotenv").config()
const jwt=require("jsonwebtoken")
const redisClient = require("../helpers/redis")


const signup=async(req,res)=>{

       try {

          const {name,email,password,ip_city}=req.body;
          const isUserpresent= await UserModel.findOne({email})
          if(isUserpresent){
            res.send("User already Present Please login ")
          }

          const has= await bcrypt.hashSync(password,8);
          const newUser= new UserModel({
            name,email,password,ip_city
          })

          await newUser.save()
        
       } catch (error) {
        
         res.send({"msg":error.message})
       }
}




const login=async(req,res)=>{

    try {

       const {email,password}=req.body;
       const isUserpresent= await UserModel.findOne({email})
       if(!isUserpresent){
         return   res.send("Please register again you are not registered user ")
       }

        const isuserpassword= await bcrypt.compare(password,isUserpresent.password)

         if(!isUserpresent){
            return res.send("Invalid email and username")
         }
     
          const token = jwt.sign({userId:isUserpresent._id,ip_city:isUserpresent.ip_city},process.env.skey,{expiresIn:"6h"})
         res.send("logging successfully ", token)
        } catch (error) {
     
      res.send({"msg":error.message})
    }
}


const logout=async(req,res)=>{

    try {


       const  token= req.headers?.authorization?.split(" ")[1];
       if(!token){
        return res.status(403).send("Forbidden")
       }

        await redisClient.set(token,token)
        res.send("Logout successfuly")

    } catch (error) {
     
      res.send({"msg":error.message})
    }
}


module.exports={login,signup,logout}