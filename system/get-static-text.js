const path = require("path");
const fs = require("fs");
const render = require("./render");

module.exports = (pathname,response) => {
    return new Promise((res,rej)=>{
        pathname = "."+pathname 
        const ext = path.parse(pathname).ext;
          
        const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
        };
        
        console.log(pathname)
        fs.exists(pathname, function (exist) {
            if(!exist) {
                render.goError(404, response,{
                    errorMessage: path.parse(pathname).base + " not found"
                  });
                return;
            }

            if (!map[ext]) {
                render.goError(415, response, {
                    errorMessage: path.parse(pathname).base + " not found"
                });
                return;
            }

            fs.readFile(pathname, function(err, data){
                if(err){
                render.responseError(500,response,{
                    errorMessage: path.parse(pathname).base + " not found"
                  });
                } else {
                    res(data,map[ext]);
                }
            });
        });
    });
    
}