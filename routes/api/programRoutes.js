//export router
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005
//http://localhost:3005/api/program
//sanity check
const {programDao: dao } = require('../../daos/dao')

router.get('/', (req, res) => {
    dao.findAllPrograms(res, dao.table)
})

// http://localhost:3005/api/program/movies
router.get('/movies', (req, res) => {
    dao.findAllMovies(res);
})

// http://localhost:3005/api/program/shows
router.get('/tvshows', (req, res) => {
    dao.findAllTVShows(res);
})

// http://localhost:3005/api/program/by-rating/:rating  
router.get('/by-rating/:rating', (req, res) => {
    dao.findByRating(res, req.params.rating)
})


//http://localhost:3005/api/program/sort/:sorter
router.get('/sort/:sorter', (req, res) => {
    dao.sort(res, dao.table, req.params.sorter)
})

 // http://localhost:3005/api/program/:id => sanity check 
router.get('/:id', (req, res) => {
    dao.findById(res, req.params.id)
})

router.post('/create', (req, res)=> {
    dao.create(req, res, dao.table, req.body)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table, req.body, req.params.id)
})

module.exports = router
