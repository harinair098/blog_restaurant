var mongoose=require("mongoose")
var restaurant=require("./models/restaurant")
const seeddb = require("../v1/seeds")

// var data=[
//     {
//         name:"thaal",
//         image:"https://im1.dineout.co.in/images/uploads/restaurant/sharpen/6/m/s/p60504-15638872725d3706a87a55b.jpg?tr=tr:n-xlarge",
//         location:"infopark road,kakkanad,kochi",
//         description:"Thaal Kitchen, Kakkanad menu is collected from restaurant / received over email. Therefore menu of Thaal Kitchen, Kakkanad is subject to change and dineout does not guarantee the accuracy of menu items at Thaal Kitchen, Kakkanad."
//     },
//     {
//         name:"Burger junction",
//         image:"https://media-cdn.tripadvisor.com/media/photo-s/0d/c1/3f/38/the-burger-junction.jpg",
//         location:"eechamukk,kakkanad,kochi",
//         description:"it is a must-visit place in Kochi. they serve the most taste full burgers of all time. the shop has a really nice ambiance within the limited area. "
//     },
//     {
//         name:"Hotel Aryaas",
//         image:"https://media-cdn.tripadvisor.com/media/photo-s/0c/74/8f/4d/photo0jpg.jpg",
//         location:"eechamukk,kakkanad,kochi",
//         description:"very good south indian food "
//     },
//     {
//         name:"Urban Paratha",
//         image:"https://images.jdmagicbox.com/comp/kochi/g7/0484px484.x484.171206153012.v8g7/catalogue/urban-paratha-kakkanad-kochi-restaurants-y7suv.jpg?clr=#604c06",
//         location:"carnival food court,kakkanad,kochi",
//         description:"it is a must-visit place in Kochi. they serve the most taste full lacha parathas of all time. the shop has a really nice ambiance within the limited area. "
//     },
// ]
// data.forEach(function(seed){
//     restaurant.create(seed,function(err,rest){
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log("added")
//         }
//     })
// })

module.exports=seeddb