const express = require("express");
const connection = require("./configs/db");
require('dotenv').config();
const bodyParser = require("body-parser"); 
var cors = require('cors')
const authenticate = require("./middlewares/auth.middleware");
const todoRouter = require("./routes/todo.routes");
const app = express();
const userRouter = require("./routes/user.routes")
app.use(cors());
app.use(express.json());
// app.use(authenticate)
todoRouter.use(authenticate)
todoRouter.use(bodyParser.json())
app.use("/users",userRouter)
app.use("/todos",todoRouter)
app.get("/",(req,res)=>{
    res.send("Home Page")
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,LINK');
  });

app.listen(process.env.port,async(req,res)=>{
    try{
       await connection
       console.log("connected to database");
    }
    catch(err){
    console.log(`error while connecting to port ${process.env.port}`)
    }
    console.log("server is running")
})