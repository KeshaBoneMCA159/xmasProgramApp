// Step 1 build out my server
const express = require('express')
const server = express()
const router = require('./routes/router') // Step 4a connect to my router
const PORT = process.env.PORT || 3005

//1b Install and handle security 
const helmet = require('helmet')
const cors = require('cors')

// Step 2 Configure helmet
// server.use(helmet())
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

server.use('/', router) // Step 4b import router

// Step 1a (1st sanity check) => Check terminal
server.listen(PORT, ()=> console.log(`It's the most wonderful time of the year`))