const express = require('express');
const router  =  express.Router();
const path = require('path')
const product = require("../models/product")
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
//router.use(express.urlencoded()); //t5alik tnajem ta9rra bady ki post  req.body.productid
router.get('/',(req,res,next)=>{
  //  res.sendFile(path.join(__dirname+'/../../pages/'+'products.html'))
  product.find()
  .exec()
  .then(docs=>{
      console.log(docs)
      if(docs.length>0){
        res.status(200).json(docs)
      }else{
      res.status(404).json({message:'no entreis found'})
      }
  })
  .catch(err=>{console.log(err)
    res.status(500).json({error:err})
})
});
router.get('/:productid',(req,res,next)=>{
    const id = req.params.productid;
    console.log("id")
    product.findById(id).exec().
    then(doc=>{console.log(doc)
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({message:"no valid entry"})
        }
    
    }).
    catch(err=>{
        //console.log(err)
        res.status(500).json({error:err})
    });
});
router.post('/',(req,res,next)=>{
        const products = new product({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            price:req.body.price
        });
        products.save().then((resault)=>{
         console.log(resault)
         res.status(201).json({
            message:'handling post requests to products',
           createdproduct:resault
        })
        }).catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        });

})
router.patch('/:productId',(req,res)=>{
  
   var id = req.params.productId;

   const updateops = {};

   for (const ops of req.body){
    updateops[ops.proName] = ops.value;
   }
  
    product.update({_id:id},{$set:updateops})
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json({
            result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err:err})
    })
})
router.delete('/:productId',(req,res)=>{
    const idd = req.params.productId;
    product.remove({_id: idd}) 
    .exec()
    .then(result=>{
        
       res.status(200).json(result);
    })
    .catch(err=>{console.log(err)
    res.status(500).json({
        error:err
    })
    });
})
module.exports = router;