const express=require('express');
const app= express();
const bodyParser=require('body-parser');
const fileupload=require('express-fileupload');



const port= 30300 || process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());
app.use("/photoes",express.static(__dirname+'/photoes'));

const departmentRoute=require('./routes/departments')
const employeeRoute=require('./routes/employees')
app.use("/api/department",departmentRoute);
app.use("/api/employee",employeeRoute);


app.listen(port,()=>{
        console.log("Server Started");
});

app.get("/",(req,res)=>{
    res.send("GET");
});

// // app.post("/savefile",(req,res)=>{
// //     console.log(req.files.name);
// //     fs.writeFile("./photoes/"+req.files.name,request.files.file_data.data,(err)=>{
// //         if(err){
// //             throw err;
// //         }
// //        res.send(req.files.file_data.name)
// //     }) 
    
// })