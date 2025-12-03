// Step 5 export router
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005

// Home Page => http://localhost:3000
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'xmas-program-app home',
        name: "Merry Xmas program app"
    })
})

// Step 6 create root route
http://localhost:3005/api
router.get('/api', (req, res) => {
    //res.send('xmas api') santity check
     res.json({
        'Programs': `http://localhost:${PORT}/api/program`
        //'Actors': `http://localhost:${PORT}/api/actor`
    })

    router.use('/api/program', require('./api/programRoutes'))

    router.use((req, res, next)=> {
        res.status(404)
        .send('<h1>🎄❄️🎄 Error: Grandma got ran over by a reindeer👵🏽🦌🛷✨</h1>')
    
    })
})

module.exports = router