const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    email:String,
    pass:String,
    first_name:String,
    last_name:String,
},{
    versionKey:false
});

const UserModel = mongoose.model("user",userSchema);

module.exports = UserModel