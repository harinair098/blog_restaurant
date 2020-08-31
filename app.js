var express     =  require("express"),
app             =  express(),
mongoose        =  require("mongoose"),
bodyparser      =  require("body-parser"),
Restaurant      =  require("./models/restaurant"),
Comment         =  require("./models/comments"),
User            =  require("./models/users") ,
feedback        =  require("./models/feedback") ,
passport        =  require("passport"),
flash           =  require("connect-flash")
localstrategy   =  require("passport-local"),
passportlocal   =  require("passport-local-mongoose"),
methodoverride  =  require("method-override"),
seeddb          =  require("./seeds");

var restaurantroutes=require("./routes/restaurants");
var commentroutes=require("./routes/comments");
var userroutes=require("./routes/users");

app.use(express.static(__dirname+ "/elements"));
app.use(methodoverride("_method"));
app.use(flash())
app.use(require("express-session")({
    secret:"rusty is the best dog",
    resolve: false,
    saveUninitialized:false
}))


app.use(passport.initialize());
app.use(passport.session());


passport.use(new localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

     

mongoose.connect("mongodb+srv://hari:qwrt1245@hari.r24lw.mongodb.net/res_blog?retryWrites=true&w=majority"),{useNewUrlParser: true,useUnifiedTopology: true};
mongoose.connection.once('open',function(){
    console.log("connected");
}).on('error',function(error){
    console.log("connection error"+error)
})
app.set("view engine","ejs")
app.use(bodyparser.urlencoded({extended:true}));
app.use(function(req,res,next){
    res.locals.curentuser=req.user;
    res.locals.feed=req.feedback;
    res.locals.date=date;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
}) 
////////landing page//////////



////////////////////////////////

//////listening/////////
app.use(userroutes);
app.use(restaurantroutes);
app.use(commentroutes);


app.listen(process.env.PORT || 3000,function(){
    console.log("connection established")
})

var date=new Date().toLocaleDateString();
