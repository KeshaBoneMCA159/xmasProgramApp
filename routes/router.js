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

// Example in router.js or similar file:
router.get('/allPrograms', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/program`; // Your API endpoint for all programs

    axios.get(url)
        .then(
            (resp) => {

                res.render('pages/allPrograms', { 
                    title: 'All Xmas Programs',
                    programData: resp.data.rows 
                });
            },
            (error) => {
                next(error); 
            }
        )
})

router.get('/movies', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/program/movies`; 
    axios.get(url).then(resp => {
        // Renders views/pages/allMovies.ejs
        res.render('pages/allMovies', { programData: resp.data.rows, title: 'Christmas Movies' });
    }).catch(next);
});

router.get('/shows', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/program/shows`; 
    axios.get(url).then(resp => {
         // Renders views/pages/allShows.ejs
        res.render('pages/allShows', { programData: resp.data.rows, title: 'Christmas TV Shows' });
    }).catch(next);
});


// --- API ROUTES ---
const endpoints = [
    'program',
    'actor',
    'director',
    'producer',
    'streaming_Platform'
];

endpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`));
})

//404 page
router.use((req, res, next)=> {
    res.status(404)
    .render('pages/404', {
        title: '404 Error',
        name: '🎄❄️🎄 You lookin\' for something?'
    })
})

module.exports = router;
