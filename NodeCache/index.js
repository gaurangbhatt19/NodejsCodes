const fetch = require('node-fetch');
const express= require('express');

const Nodecache=require('node-cache');
require('dotenv').config()
const app= express();
const cache= new Nodecache({stdTTL: 10 }); // time data would be in cache, then cleared 10 secs
const port= process.env.PORT;

app.get("/todos",async (req,res)=>{

    // check if key is in cache

    if(cache.has("todos")){
        return res.send(cache.get("todos"))
    }
    // fetch data is not in cache
    else{
        const data= await fetch(process.env.url)

        if(! await data.ok) {
        console.error("Error")
        return  res.status(500).json({error:"true"})
        }

        const json= await data.json();
        cache.set("todos",json)
       return res.send(json);
    } 
   
})

app.get("/todos/:id",async (req,res)=>{

    // cache key userId number

   if(cache.has("userId"+req.params.id)){
        return res.send(cache.get("userId"+req.params.id))
   }
   else{
        const data= await fetch(process.env.url+"/"+req.params.id)
 
        if(! await data.ok) {
            console.error("Error")
            return res.status(500).json({error:"true"})
            
        }
 
        const json= await data.json();
        cache.set("userId"+req.params.id,json)
        return res.send(json);  
   }

    
 })


app.listen(port,()=>{
console.log("Server Cache")
})