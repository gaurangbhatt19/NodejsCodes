require('dotenv').config();
const express= require('express');
const app= express();
const jwt=require('jsonwebtoken')
const posts=[
    {username:"gaurang",title:"Post1"},
    {username:"bhatt",title:"Post2"}
]
app.use(express.json());
app.get("/posts",(req,res)=>{

    res.json(posts);
})
app.post("/login",(req,res)=>{

const username=req.body.username;
const user={name: username};
const access_token=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
res.json({access_token_key:access_token});


})

app.listen(3030,()=>{
    console.log("Server Started");
})