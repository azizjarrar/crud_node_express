const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    try {
    const decoded = jwt.verify(token,process.env.JWT_KEY)
    req.userData=decoded;
    next()
    }catch(error){
        return res.status(404).json({
            message:'auth failed'
        })
    }
}

/*
 const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    
    const decoded = jwt.verify(token,process.env.JWT_KEY)
    req.userData=decoded;
    next()
    }catch(error){
        return res.status(404).json({
            message:'auth failed'
        })
    }
}
 */