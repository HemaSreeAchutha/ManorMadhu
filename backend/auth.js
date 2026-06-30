const jwt=require("jsonwebtoken");

function auth(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"No token taken"});
    }

    try{
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            message:"Invalid token"
        });
    }
}

module.exports=auth;
