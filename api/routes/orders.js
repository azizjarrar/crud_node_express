const express = require('express');
const router  =  express.Router();
const mongoose = require('mongoose')
const Order = require('../models/orders')
const ordesconttoler = require('../controllers/orders')


router.get('/',ordesconttoler.order_getall)
//5d110ef82b770531a40c5f26 famech menou
// fama 5d110f002b770531a40c5f27
router.post('/',ordesconttoler.postorders)
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
    var idd=req.params.orderid
    Order
    .deleteOne({_id: idd})
    .exec()
    .then((result)=>{
        //message:"is delated"
        res.status(200).json({result});
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})
module.exports = router;