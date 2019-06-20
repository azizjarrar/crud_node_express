const express = require('express');
const router  =  express.Router();
router.get('/',(req,res)=>{
    res.status(200).json({
        message:'orders were feteched'
    })
})
router.post('/',(req,res)=>{
    res.status(201).json({
        message:'orders was created'
    })
})
router.get('/:orderid',(req,res)=>{
     var id1=req.params.orderid
    res.status(201).json({
        message:"order details",
        id:id1
    })
})
router.get('/:orderid',(req,res)=>{
    console.log("aa")
    var id1=req.params.orderid
   res.status(201).json({
       message:"order details",
       id:id1
   })
})
router.delete('/:orderid',(req,res)=>{
    var id1=req.params.orderid
   res.status(201).json({
       message:"order deletaed",
       id:id1
   })
})
module.exports = router;