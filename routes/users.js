var express=require("express");
const { route } = require("./comments");
var passport=require("passport")
var router=express.Router();
var User=require("../models/users")

router.get("/",function(req,res){
    res.render("users/landing")
})
router.get("/about",function(req,res){
    res.render("users/about")
})

router.get("/register",function(req,res){
    res.render("users/register")
})

router.post("/register",function(req,res){
    var newUser= new User({username: req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err)
            req.flash("error",err.message)
            return res.render("register")
        }
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","welcome aboard!")
                res.redirect("/restaurants")
            })
        }
    })
})

//login//
router.get("/login",function(req,res){
    res.render("users/login")
})
router.post("/login",passport.authenticate("local",{
    successRedirect:"/restaurants",
    failureRedirect:"/login"

}) ,function(req,res){
    req.flash("success","welcome back!")
})

//////logout/////////
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","sucessfully logged you out" )
    res.redirect("/restaurants")
})
////////////////

module.exports=router;