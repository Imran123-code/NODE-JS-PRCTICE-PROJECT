const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    // =========header data
    let ColletedHeaderData = fs.readFileSync('header.html', 'utf-8')
    let footerData = fs.readFileSync('footer.html','utf-8')
    let file = 'web.html';
    if (req.url !== '/' && req.url !== '/web.css') {
        file = req.url.substring(1) + '.html';
    }
    // =========body data
    if (req.url != '/web.css') {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'content-type': 'text/plain' })
                res.end("Error loading HTML file")
                return
            }
            // console.log(ColletedHeaderData)
            res.writeHead(200, { 'content-type': 'text/html' })
            res.end(ColletedHeaderData + "" + data+""+footerData)
        })
    } else if (req.url === '/web.css') {
        fs.readFile('web.css', 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'content-type': 'text/plain' })
                res.end("Error css not found")
                return false
            }
            res.writeHead(200, { 'content-type': 'text/css' })
            res.end(data)
        })
    }
}).listen(9800, () => {
    console.log("Server running at http://localhost:9800")
})