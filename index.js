// get somthing
// post to add 
//patch update
//delete is delete
const http= require('http');
const app = require('./app')
const port = process.env.PORT || 3000; 
const server = http.createServer(app);
server.listen(port);