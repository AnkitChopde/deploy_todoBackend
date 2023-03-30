const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task:String,
    status:Boolean,
    userID:String
},{
    versionKey:false
});

const TodoModel = mongoose.model("todo",todoSchema);

module.exports=TodoModel;