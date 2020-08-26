var mongoose = require("mongoose");
var comment  = new mongoose.Schema({
    text:String,
    ambience:Number,
    food:Number,
    service:Number,
    valueformoney:Number,
    img:String,
    average:Number,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    }
})
module.exports=mongoose.model("comment",comment)