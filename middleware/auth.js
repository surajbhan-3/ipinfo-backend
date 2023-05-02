const jwt =require("jsonwebtoken")
require("dotenv").config()

const redisClient=require("../helpers/redis")

const authenticator= async(req,res,next)=>{


    try {
        const token=req.headers?.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).send("Please login again")
        }
        const isValidtoken= await jwt.verify(token,process.env.skey)
        if(!isValidtoken){
            return res.send("Authenctication failed ")
        }
        const tokenblacklisted= await redisClient.get(token)
        if(tokenblacklisted){
            return res.send("unauthorized")

        }
        req.body.userId=isValidtoken.userId;
        req.body.ip_city=isValidtoken.ip_city;
        next()
           
    } catch (error) {
        res.send("Error")
    }
}

module.exports={authenticator}