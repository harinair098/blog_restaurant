var mongoose = require("mongoose");
var feedback  = new mongoose.Schema({
    quest1:String,
    quest2:String,
    quest3:String,
    allow:Boolean,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    }
})
module.exports=mongoose.model("feedback",feedback)