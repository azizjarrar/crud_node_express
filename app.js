const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const bodyParser = require('body-parser');
const path = require('path')
/*ta3tik info al ping ou fazet akeka ou type mta3 requete */
const morgan = require('morgan')

//app.use(morgan('dev'))

/***********connection************** */
var MongoClient = require('mongoose');
/************************ */
/***********connect to mongoatlas************ */
var url="mongodb+srv://azizjarrar:azizjarrar@cluster0-7kbrh.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(url,{useNewUrlParser: true},(err,cl)=>{
if(err){
    throw err
}else{
    console.log("connextion secc");
}
})


/************************************** */
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})
app.get('/', (req,res)=>{
res.sendFile(path.join(__dirname+'/pages/index.html'))
});
app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);
app.use((req,res,next)=>{
    const error1 = new Error('Not found')
   next(error1);
})
app.use((error1,req,res,next)=>{
   res.status(500)
    res.json({error:{
        message:error1.message
    }})
})

module.exports = app;