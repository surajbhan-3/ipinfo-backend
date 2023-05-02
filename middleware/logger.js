const winston = require("winston")
const expresswinston=require("express-winston")
require("winston-mongodb")


const {format,createLogger,transports}=winston


const logger= winston.createLogger({

     level:"info",
     format:winston.format.json(),
     transports:[
         new winston.transports.MongoDB({
            db:process.env.mongoURL,
            collection:"logs",
            options:{
                useUnifiedTopology:true,
            }
         })
     ]
})

// const errorlogger= winston.createLogger({

//     level:"error",
//     format:winston.format.json(),
//     transports:[
//         new winston.transports.MongoDB({
//            db:process.env.mongoURL,
//            collection:"logs",
//            options:{
//                useUnifiedTopology:true,
//            }
//         })
//     ]
// })

module.exports={logger}