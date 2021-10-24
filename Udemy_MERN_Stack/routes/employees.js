const express=require('express');
const router=express.Router();
const MongodbClient=require("mongodb").MongoClient;
const fs= require('fs');

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
    database.collection("Employee").find({}).toArray((err,data)=>{
        if(err){
            throw err;
        }
        res.send(data);    
    })
}).post((req,res)=>{
    database.collection("Employee").count({},(err,count)=>{
     if(err){
         throw err;
     }
     database.collection("Employee").insertOne({
        employee_id:count+1,
        employee_name: req.body.employee_name,
        department_name:req.body.department_name,
        date_of_joining:req.body.date_of_joining,
        photo_file_name:req.body.photo_file_name
     })
    })
    res.send("Employee Added");
}).put((req,res)=>{
    console.log("PUT API")
    database.collection("Employee").updateOne(
        {
            "employee_id":req.body.employee_id
        },
        {
            $set:
            {
               "employee_name":req.body.employee_name
            }
        }    
    );
    res.send("Updated Employee Name of ID : "+req.body.employee_id);
});

   router.route("/:id").delete((req,res)=>{
    database.collection("Employee").deleteOne({
        "employee_id":parseInt(req.params.id)
    })
    res.send("Employee of ID "+req.params.id+" Deleted");
  });

// middleware before route, file_data is the key in file json

  router.route("/savefile")
  .post((req,res)=>{
      console.log(req)
      let fileObject=req.files.file_data;

    fs.writeFile("./photoes/"+fileObject.name,fileObject.data,(err)=>{
        if(err){
            throw err;
        }
       res.send(req.files.file_data.name);
    }) 
    
}
  )


module.exports=router;