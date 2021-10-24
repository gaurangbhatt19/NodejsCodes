const express=require('express');
const router=express.Router();
const MongodbClient=require("mongodb").MongoClient;

let CONNECTION_STRING="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
let DATABASE_NAME="mongoDB_MERN_Stack";

try{
   MongodbClient.connect(CONNECTION_STRING,(err,client)=>{
       if(err) throw err;

       database=client.db(DATABASE_NAME);
       console.log("Database Connected");
   });

}catch(e){
    throw e;
}

router.route("").get((req,res)=>{
    database.collection("Department").find({}).toArray((err,data)=>{
        if(err){
            throw err;
        }
        res.send(data);    
    })
}).post((req,res)=>{
    database.collection("Department").count({},(err,count)=>{
     if(err){
         throw err;
     }
     database.collection("Department").insertOne({
        department_id:count+1,
        department_name:req.body.department_name,
        name:req.body.name
     }
     )
    })
    res.send("Department Added");
}).put((req,res)=>{
    console.log("PUT API")
    database.collection("Department").updateOne(
        {
            "department_id":req.body.department_id
        },
        {
            $set:
            {
               "department_name":req.body.department_name
            }
        }    
    );
    res.send("Updated Department Name of ID : "+req.body.department_id);
});

router.route("/:id").delete((req,res)=>{
    database.collection("Department").deleteOne({
        "department_id":parseInt(req.params.id)
    })
    res.send("Department of ID "+req.params.id+" Deleted");
  });

module.exports=router;