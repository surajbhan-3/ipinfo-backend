const express=require("express")
const { connection } = require("./config/db")
require("dotenv").config()
const {userRouter}=require("./routes/user.routes")
const {cityRouter}=require("./routes/city.rotutes")
const expresswinston=require("express-winston")
const winston=require("winston")
const {logger}=require("./middleware/logger")



const app=express()
app.use(express.json())
// app.use(logger)

app.get("/",(req,res)=>{

    res.send("Welcome to homepage")
})



app.use("api/user",userRouter)
app.use("api/ip",cityRouter)

app.listen(process.env.PORT,async()=>{

      try {
        await connection
        console.log("Connected to mongodb")
        logger("info","database is connected")
      } catch (error) {
         console.log(error)
         logger("error")
      }

      console.log("Server is running")
})