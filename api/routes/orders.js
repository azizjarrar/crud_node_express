const express = require('express');
const router  =  express.Router();
const mongoose = require('mongoose')
const Order = require('../models/orders')
const product = require('../models/product')
router.get('/',(req,res)=>{
    Order
    .find()
    .select('quantity product _id')
    .populate('product','name')//kif jointeur traja3lk product mil  collection lo5ra
    .exec()
    .then(result=>{
        res.status(201).json({
            res:result
        })
    })
    .catch(err=>{
        res.status(500).json({error:err})
    })
})
//5d110ef82b770531a40c5f26 famech menou
// fama 5d110f002b770531a40c5f27
router.post('/',(req,res)=>{
    product.findById(req.body.productid)
    .exec()
    .then((result)=>{
        if(!(result)){return res.status(404).json({
            message:"product not found"
        })}
        const order = new Order({
            _id:mongoose.Types.ObjectId(),
            quantity:req.body.quantity,
            product:req.body.productid
        });
        order.save()
        .then((result)=>{
            console.log(result)
            res.status(201).json({result})
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({error:err})
        })
        
    })
    .catch(err=>{console.log({err:error})
    res.status(500).json({message:'product not found',
    error:err    
})
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