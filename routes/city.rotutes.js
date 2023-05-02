const {Router}=require("express")
const {authenticator}=require("../middleware/auth")
const {validateIpformat}=require("../middleware/ipvalidator")

const {getcityIP}=require("../controllers/city.controllers")


const cityRouter=Router()


cityRouter.get("/:ip",getcityIP,authenticator,validateIpformat)


module.exports={cityRouter}