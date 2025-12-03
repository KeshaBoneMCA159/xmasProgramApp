// Step 5 export router
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005

// Step 6 create root route
http://localhost:3005/api
router.get('/api', (req, res) => {
    //res.send('movie api') santity check
     res.json({
        'Programs': `http://localhost:${PORT}/api/program`
        //'Actors': `http://localhost:${PORT}/api/actor`
    })

    router.use((req, res, next)=> {
        res.status(404)
        .send('<h1>🎄❄️🎄 Error: Grandma got ran over by a reindeer👵🏽🦌🛷✨</h1>')
    
    })
})

module.exports = router