const express = require('express');
const app = express();
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const path = require('path')
console.log(__dirname)
app.get('/', (req,res)=>{
res.sendFile(path.join(__dirname+'/pages/index.html'))
});
app.use('/products',productRoutes);
app.use('/orders',ordersRoutes);
module.exports = app;