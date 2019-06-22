const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const bodyParser = require('body-parser');
const path = require('path')
/*ta3tik info al ping ou fazet akeka ou type mta3 requete */
const morgan = require('morgan')

//app.use(morgan('dev'))
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