import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs/promises';
const port=process.env.port;
const server=http.createServer((req,res) =>{
 //   console.log(req.url);
//     console.log(req.method);
try {
    if(req.method === 'GET'){
        if(req.url ==='/'){
            res.writeHead(200,{'Content-type': 'text/html'});
            res.end('<h1> hello world </h1>');
        
        }
        else if(req.url ==='/about'){
            res.writeHead(200,{'Content-type': 'text/html'});
            res.end('<h1>About</h1>');
        }
        else{
        
        res.writeHead(404,{'Content-type': 'text/html'});
        res.end('<h1>NOT FOUND </h1>');
        }
        

    }
    else {
        throw new Error('Method not allowed');


    }
    
    
} catch (error) {
    res.writeHead(500,{'Content-type': 'text/html'});
    res.end('<h1>Server Error</h1>');
    
}
});
server.listen(port,() =>{
    console.log(`server running on ${port}`);

});