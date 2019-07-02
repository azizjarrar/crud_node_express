const express = require('express');
const router  =  express.Router();
const mongoose = require('mongoose')
const Userr = require('../models/user')
const bcrypt = require('bcrypt')
router.post('/signup',(req,res,next)=>{
    Userr.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length>0){
                return res.status(409).json({
                    message:'mail exsists'
                });   
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(400).json({
                            error:err
                        })
                    }else{
                        const user = new Userr({
                            _id: new mongoose.Types.ObjectId(),
                            email:req.body.email,
                            password:hash
                        })
                        user.save()
                        .then((result)=>{
                            console.log(result)
                            return res.status(201).json({
                                message:'user created'
                            });
                        })
                        .catch(err=>{
                            res.status(500).json({
                                error:err
                            })
                        });
                    }
                })
            }
        })
        .catch()


})

router.delete('/:userid',(req,res,next)=>{

    Userr.remove({email:req.params.userid})
    .exec()
    .then(result=>{
        res.status(200).json({message:"user deleted"})
    })
    .catch(err=>
        {
        res.status(400).json({error:err})
    })
})

module.exports = router;

