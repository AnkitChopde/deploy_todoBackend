
const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    console.log("1")
    const token = req.headers?.authorization.split(" ")[1]
    console.log(token)
    
    if(token){
        var decoded = jwt.verify(token, 'ankesh');
        if(decoded){
            console.log(decoded)
          req.body.userID=decoded.userID
            next();
        }else{
            res.status(400).send({
                "msg":"Please Login First!"
            })
        }
    }else{
        res.status(400).send({
            "msg":"Please Login First!"
        })
    }
}

module.exports=authenticate