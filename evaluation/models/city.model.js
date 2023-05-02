const mongoose=require("mongoose")


const citySchema=mongoose.Schema({

    userId:{type:mongoose.Types.ObjectId,required:true},
    cities_ip:[{type:String,required:true}]

})


const CityModel=mongoose.model("citi",citySchema)


module.exports={CityModel}
