const express = require('express');
const router  =  express.Router();
const path = require('path')
//const bodyParser=require('body-parser')
router.use(express.urlencoded()); 
router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname+'/../../pages/'+'products.html'))
    
});
router.post('/',(req,res,next)=>{

   const id = req.body.productid;
  
    if(id==='special'){
        res.status(200).json({
            message:"you discovered the special ID",
            id:id
        })
    }else{
        res.status(200).json({
            message:"you did not discovered the special ID"
        })
    }
})

router.patch('/:productId',(req,res)=>{
    res.status(200).json({
        message:"handling patch req to / products"
    })
})
router.delete('/:productId',(req,res)=>{
    res.status(200).json({
        message:"handling del req to / products"
    })
})
module.exports = router;