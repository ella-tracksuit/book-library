const http = require('http')
const fs = require('fs')
const path = require('path')

const db = require('./db')

const server = http.createServer((req, res) => {
    
    let filePath = path.resolve(__dirname + '/../public' + req.url)
    
    if (fs.existsSync(filePath)) {

        if(fs.statSync(filePath).isDirectory()) {
            filePath += '/index.html'
        }
        
        fs.readFile(filePath, (err, data) => {
            if(err) {
                res.statusCode = 500
                res.end(`Error getting the file: ${err}.`)
            } else {
                res.end(data)
            }
        })

    } else {
            res.statusCode = 404
            res.end(`File ${filePath} not found!`)
    }

})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => {
    const addr = server.address()
    console.log("Server listening at", addr.address + ":" + addr.port)
})
