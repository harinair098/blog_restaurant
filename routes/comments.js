var express= require("express");
var router=express.Router();
var Comment=require("../models/comments")
var Restaurant=require("../models/restaurant")

router.get("/restaurants/:id/comments/new",isloggedin,function(req,res){
    Restaurant.findById(req.params.id,function(err,rest){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{rest:rest})
        }
    })
})

router.post("/restaurants/:id/comments",isloggedin,function(req,res){
    Restaurant.findById(req.params.id,function(err,rest){
        if(err){
            console.log(err)
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    req.flash("error","SOMETHING'S NOT RIGHT")
                    console.log(err)
                }
                else{
                    comment.average=(comment.ambience+comment.food+comment.service+comment.valueformoney)/4
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save()
                    rest.comments.push(comment)
                    rest.save()
                    req.flash("success","YOUR REVIEW HAS BEEN ADDED")
                    res.redirect("/restaurants/"+rest._id)
                }
            })            
        }
    })
})

///edit a comment///////
router.get("/restaurants/:id/comments/:commentid/edit",function(req,res){
    Comment.findById(req.params.commentid,function(err,comments){
        if(err){
            req.flash("error","SOMETHING'S NOT RIGHT")
        res.redirect("back")}
        else{
            req.flash("success","YOUR REVIEW HAS BEEN UPDATED")
            res.render("comments/edit",{rest_id:req.params.id,comment:comments})
        }
    })
    })
    router.put("/restaurants/:id/comments/:commentid",function(req,res){
        // console.log(req.body.comment)
        // data={
        //     text:req.body.text
        // }
        Comment.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,comment){
            if(err){
            res.redirect("back")}
            else{
                res.redirect("/restaurants/"+req.params.id)
            }
        })
    })

///////deleting comments////////
router.delete("/restaurants/:id/comments/:commentid",function(req,res){
    Comment.findByIdAndRemove(req.params.commentid,function(err,del){
        if(err){
            req.flash("error","SOMETHING'S NOT RIGHT")
            res.redirect("back");
        }
        else{
            req.flash("success","YOUR REVIEW HAS BEEN DELETED")
            res.redirect("/restaurants/"+req.params.id)
        }
    })
})

function isloggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// function checkcomment(req,res,next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.commentid,function(err,comment){
//             if(err){
//                 res.send("NOT AUTHORIZED")
//             }
//             else{
//                 if(comment.author.id.equals(req.user._id)){
//                     next();
//                 }
//             }
//         })
//     }
//     else{
//         res.redirect("back")
//     }
// }

module.exports=router;
