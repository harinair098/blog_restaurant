var express=require("express");
var router=express.Router()
var Comment=require("../models/comments")
var Restaurant=require("../models/restaurant")

router.get("/restaurants",function(req,res){
    console.log(req.query.search)
    if(req.query.search){
        const regex=new RegExp(escapeRegex(req.query.search),'gi');
        if(req.query.resto==='none'){
            res.redirect("back")
        }else if(req.query.resto==='name'){
            Restaurant.find({name:regex},function(err,code){
                if(err){
                    console.log(err)
                }
                else{
                    res.render("restaurants/index",{restaurant:code,curentuser:req.user})
                }
            })
        }else if(req.query.resto === 'location'){
            Restaurant.find({location:regex},function(err,code){
                if(err){
                    console.log(err)
                }
                else{
                    res.render("restaurants/index",{restaurant:code,curentuser:req.user})
                }
            })
        }    
    }else{
        Restaurant.find(function(err,code){
            if(err){
                console.log(err)
            }
            else{
                res.render("restaurants/index",{restaurant:code,curentuser:req.user})
            }
        })
    }   
})

router.post("/restaurants",function(req,res){
    var newcreated={
        name:req.body.name,
        image:req.body.image,
        location:req.body.location,
        price:req.body.price,
        drinks:req.body.drinks,
        stars:req.body.stars,
        dish:req.body.dish,
        img:req.body.img,
        veg:req.body.veg,
        takeaway:req.body.takeaway,
        description:req.body.description
    };
    Restaurant.create(newcreated,function(err,rest){
        if(err){
            req.flash("error","something went wrong")
            console.log(err)
        }
        else{
            rest.author.id=req.user._id;
            rest.author.username=req.user.username
            rest.save();
            req.flash("success","NEW RESTO ADDED")
            res.redirect("/restaurants")
        }
    })
})
router.get("/restaurants/new",isAdmin,function(req,res){
    
    res.render("restaurants/new")
})
router.get("/restaurants/:id",function(req,res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err,rest){
        if(err){
            req.flash("error","something went wrong")
            console.log(err)
        }
        else{
            res.render("restaurants/show",{rest:rest,curentuser:req.user})
        }
    })
})

///////edit//////////
router.get("/restaurants/:id/edit",isloggedin,isAdmin,function(req,res){
    Restaurant.findById(req.params.id,function(err,rest){
        if(err){
            req.flash("error","something went wrong")
            console.log(err)
        }
        else{
            req.flash("success","RESTO HAS BEEN EDITED")
            res.render("restaurants/edit",{rest:rest})
        }
    })
})
router.put("/restaurants/:id",function(req,res){
    Restaurant.findByIdAndUpdate(req.params.id,req.body.restaurant,function(err,rest){
        if(err){
            console.log(err)
        }
        else{

            res.redirect("/restaurants/"+req.params.id)
        }
    })
})

////delete restaurant///////
router.delete("/restaurants/:id",isloggedin,isAdmin,function(req,res){
    Restaurant.findByIdAndDelete(req.params.id,function(err,del){
        if(err){
            req.flash("error","something went wrong")
            res.render("back");
        }
        else{
            req.flash("success","RESTO HAS BEEN DELETED")
            res.redirect("/restaurants")
        }
    })
})


function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
function isAdmin(req,res,next){
    if(req.user.username==='admin'){
        return next();
    }
    else{
        res.send("YOU ARE NOT AUTHORIZED")
    }
}
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports=router;