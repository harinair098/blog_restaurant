var express=require("express");
const { route } = require("./comments");
var passport=require("passport")
var router=express.Router();
var User=require("../models/users")
var Feedback=require("../models/feedback")

router.get("/",function(req,res){
    res.render("users/landing")
})
////////FEEDBACK//////////
router.get("/feedback",isloggedin,function(req,res){
    Feedback.find({"author.username":req.user.username},function(err,result){
        result.allow=true;
       if(Object.keys(result).length === 0 || result.allow){
           value=0
        res.render("users/about",{value:value})
       }else{
           value=1;
           res.render("users/about",{value:value})
        }   
       console.log(Object.keys(result).length)
       console.log(value)
    })
})
router.post("/feedback",isloggedin,function(req,res){
    Feedback.create(req.body.feedback,function(err,feed){
        if(err){
            req.flash("error","something went wrong")
            console.log(err);
        }
        else{
            feed.author.id=req.user._id;
            feed.author.username=req.user.username;
            feed.save();
            req.flash("success","YOUR FEEDBACK HAS BEEN GIVEN");
            res.redirect("/restaurants")
        }
    })
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

function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;