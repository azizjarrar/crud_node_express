const Order = require('../models/orders')
const mongoose = require('mongoose')
const product = require('../models/product')

exports.order_getall = (req,res)=>{
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
}



exports.postorders = (req,res)=>{
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
}

