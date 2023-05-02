const redisClient = require("../helpers/redis")
require("dotenv").config()
const {validateIpformat}=require("../middleware/ipvalidator")
const axios=require("axios")
const {useripcityLists}= require("../models/city.model")

const getcityIP= async(req,res)=>{

    try {


        const ip= req.params.ip|| req.body.ip_city;

        const isipCache= await redisClient.get(ip)

        if(isipCache){
            return res.status(200).send({data:isipCache})
        }


        const rsp= await axios.get(`https://ipapi.co/${ip}/json/`)
        const ipdata= rsp.getcityIP

        redisClient.set(ip,JSON.stringify(ipdata),{EX:60*60*6})

      await useripcityLists.findByIdAndUpdate({userId:req.body.userId},{
        userId:req.body.userId,$push:{cities_ip:ip}
      },{new:true,upsert:true})
      return res.send({data:ipdata})


        
    } catch (error) {
        res.status(500).send(error.message)   
    }
}

module.exports={getcityIP}