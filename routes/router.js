// Step 5 export router
const express = require('express');
const router = express.Router();
const axios = require('axios');
const PORT = process.env.PORT || 3005;

router.use(express.static('public'));

// Homepage Route (localhost:3005)
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'xmas-program-app home',
        name: 'Merry Xmas program app',
        currentPage: 'home' 
    });
});

// Single Program Display Page
router.get('/program/:id', (req, res, next) => {
    const id = req.params.id;
    const url = `http://localhost:${PORT}/api/program/${id}`;

    axios.get(url)
    .then(
        // Success Handler
        (resp) => {
            const program = resp.data;
             console.log("DEBUG: Data object passed to EJS:", program);
            res.render('pages/single-Program', {
                title: `Xmas Program: ${program.title}`,
                name: 'Xmas Program Details',
                program: program,
                currentPage: 'programDetail',
                programData: resp.data
            });
        },
        // Error Handler
        (error) => {
            next(error); 
        }
    );
});

// All Programs Display Page (The ONLY one that shows the All Movies/Shows links)
router.get('/allPrograms', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/program`;

    axios.get(url)
        .then(
            // Success Handler
            (resp) => { 
                res.render('pages/allPrograms', {
                    title: 'All Xmas Programs',
                    name: 'All Xmas programs',
                    currentPage: 'allPrograms', 
                    programData: resp.data
                });
            },
            // Error Handler
            (error) => {
                next(error); 
            }
        );
});

// All Movies Page 
router.get('/movies', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/program/movies`; 
    axios.get(url)
    .then(
        // Success Handler
        (resp) => {
            res.render('pages/allMovies', {
                title: 'All Xmas Movies',
                name: 'All Xmas Movies',
                currentPage: 'movies',
                programData: resp.data
            });
        },
        // Error Handler
        (error) => {
            next(error); 
        }
    );
});

// All Shows Page 
router.get('/shows', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/program/shows`; 
    axios.get(url)
    .then(
        // Success Handler
        (resp) => {
            res.render('pages/allShows', {
                title: 'All Xmas TV Shows',
                name: 'All Xmas TV Shows',
                currentPage: 'shows', 
                programData: resp.data
            });
        },
       
        (error) => {
            next(error); 
        }
    );
});

// All Actors Page
router.get('/actor', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/actor`;
    axios.get(url)
    .then(
        (resp) => {
            res.render('pages/allActors', {
                title: 'All Actors', 
                name: 'All Actors',
                currentPage: 'actors', 
                actorData: resp.data
            });
        },
        (error) => {
            next(error); 
        }
    );
});

// All Directors Page
router.get('/director', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/director`;
    axios.get(url)
    .then(
        (resp) => {
            res.render('pages/allDirectors', {
                title: 'All Directors', 
                name: 'All Directors',
                currentPage: 'directors', 
                directorData: resp.data
            });
        },
        (error) => {
            next(error); 
        }
    );
});

// All Producers Page
router.get('/producer', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/producer`;
    axios.get(url)
    .then(
        (resp) => {
            res.render('pages/allProducers', {
                title: 'All Producers', 
                name: 'All Producers',
                currentPage: 'producers', 
                producerData: resp.data
            });
        },
        (error) => {
            next(error); 
        }
    );
});

// All Streaming Platforms Page
router.get('/stream', (req, res, next) => {
    const url = `http://localhost:${PORT}/api/streaming_platform`;
    axios.get(url)
    .then(
        (resp) => {
            res.render('pages/allStreaming_Platforms', {
                title: 'All Streaming Platforms', 
                name: 'All Streaming Platforms',
                currentPage: 'streaming platforms', 
                streamingPlatformData: resp.data
            });
        },
        (error) => {
            next(error); 
        }
    );
});


// --- API ROUTES (Standard Setup) ---

// API Index
router.get('/api', (req, res)=> {
    res.json({
        'All Programs': `http://localhost:${PORT}/api/program`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Directors': `http://localhost:${PORT}/api/director`,
        'All Producers': `http://localhost:${PORT}/api/producer`,
        'All Movies': `http://localhost:${PORT}/api/program/movies`,
        'All Shows': `http://localhost:${PORT}/api/program/shows`,
        'All Streaming Platforms': `http://localhost:${PORT}/api/streaming_platform`
    });
});

// API endpoints
const apiEndpoints = [
    'program', 
    'actor', 
    'director',
    'producer',
    'streaming_platform'
    
];

apiEndpoints.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`));
});


// 404 page
router.use((req, res, next)=> {
    res.status(404)
    .render('pages/404', {
        title: '404 Error',
        name: '🎄❄️🎄 You lookin\' for something?',
        currentPage: '404'
    });
});

module.exports = router
