const {Router}=require("express")

const {login,signup,logout}=require("../controllers/user.controllers")

const {authenticator}=require("../middleware/auth")

const userRouter=Router()


userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/logout",authenticator, logout)


module.exports={userRouter}