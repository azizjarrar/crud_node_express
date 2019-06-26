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
  .select('name price _id')
  .exec()
  .then(docs=>{
    const response = {
        count: docs.length,
        products:docs.map(doc=>{
            return {
                name:doc.name,
                price:doc.price,
                _id:doc.id,
                url:{
                    type:'GET',
                    url:'http://localhost:3000/products/'+doc.id
                }
            }
        })
      };
        res.status(200).json(response)
  })
  .catch(err=>{console.log(err)
    res.status(500).json({error:err})
})
});
router.get('/:productid',(req,res,next)=>{
    const id = req.params.productid;
    product.findById(id)
    .select('name price _id')
    .exec().
    then(doc=>{
        if(doc){
            
          const responses = {
            count: doc.length,
            products:{
                name:doc.name,
                price:doc.price,
                _id:doc.id
            }
          };
          
            res.status(200).json(responses)
        }else{
           res.status(404).json({message:"no valid entry"})
       }
    
    }).
    catch(err=>{
        res.status(404).json({error:err})
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
            message:'Created product successfully',
           createdproduct:{
               name:resault.name,
               price:resault.price,
               _id:resault._id,
               request:{
                type:"get",
                url:'http://localhost:3000/products/'+resault._id
               }
           }
        })
        }).catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        });

})
router.patch('/:productId',(req,res)=>{
   var id = req.params.productId;

   
   const updateops = {
       "name":req.body.name,
       "price":req.body.price
   }

  console.log(updateops)
    product.updateOne({_id:id},{$set:updateops})
    .exec()
    .then(result=>{
        res.status(200).json(result)
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
//validation ou tarji 7aja mezyean mouch kol chay