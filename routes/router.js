// Step 5 export router
const express = require('express')
const router = express.Router()
const axios = require('axios')
const PORT = process.env.PORT || 3005

router.use(express.static('public'))

// --- DISPLAY ROUTES ---

// Homepage Route (localhost:3005)
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'xmas-program-app home',
        name: "Merry Xmas program app"
    })
})

// Single Program Display Page
router.get('/program/:id', (req, res, next) => {
    const id = req.params.id
    const url = `http://localhost:${PORT}/api/program/${id}`

    axios.get(url)
    .then(
        // Success Handler
        (resp) => {
            const program = resp.data
            res.render('pages/program', {
                title: `Xmas Program: ${program.title}`,
                name: 'Xmas Program Details',
                program: program
            })
        },
        (error) => {
        
            next(error); 
        }
    )
})

const endpoints = [
    'program',
    'actor',
    //'director',
    //'producer',
    
];

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`));
})

//404 page
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1>🎄❄️🎄 Error: Grandma got ran over by a reindeer👵🏽🦌🛷✨</h1>')
})

module.exports = router;
