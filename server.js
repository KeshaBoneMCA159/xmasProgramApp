//start with building out the server
const express = require('express')
const server = express()
const router = require('./routes/router') // connect to my router
const PORT = process.env.PORT || 3005

//Install and handling security
const helmet = require('helmet')
const cors = require('cors')

// configure helmet
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
     crossEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
}))

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

server.set('view engine', 'ejs')

server.use('/', router) // Import router

//sanity check
server.listen(PORT, ()=> console.log(`It's the most wonderful time of the year`))