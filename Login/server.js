const express=require('express');
const app=express();
const bcrypt=require("bcrypt");
const user=[];

app.set("view-engine","ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs",{name:"JavaScript"});
})


app.get("/register",(req,res)=>{
    res.render("register.ejs");
})




app.get("/login",(req,res)=>{
    res.render('login.ejs');
})

app.post('/login',(req,res)=>{
    
})

app.post('/register',async (req,res)=>{
 try{
     console.log(req.body.name);
   const hash= await bcrypt.hash(req.body.password,10);
   user.push({
       id:Date.now().toString,
       name:req.body.name,
       email:req.body.email,
       password:hash,
   })
   res.redirect("/login");
 }catch(e){
   res.redirect("/register")
 }
 console.log(user);
})

app.listen(3300,()=>{
    console.log("Server");
})