var mongoose=require("mongoose");
var restaurantschema=new mongoose.Schema(
    {
    name:String,
    image:String,
    location:String,
    price:String,
    drinks:String,
    veg:String,
    takeaway:String,
    dish:String,
    img:String,
    stars:Number,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
}
)

module.exports=mongoose.model("restaurant",restaurantschema)