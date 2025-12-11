const express = require('express')
const router = express.Router()

const { actorDao: dao } = require('../../daos/dao')

//http://localhost:3005/api/actor => sanity check
router.get('/', (req, res) => {
    dao.findAllActors(res, dao.table)
})

//http://localhost:3005/api/program/sort/:sorter
router.get('/sort/:sorter', (req, res) => {
    dao.sort(res, dao.table, req.params.sorter)
})

 // http://localhost:3005/api/program/:id => sanity check
router.get('/:id', (req, res) => {
    dao.findById(res, req.params.id)
})

//http://localhost:3005/api/actor/get_programs/:id sanity check
router.get('/get_programs/:id', (req, res) => {
    dao.findProgramsByActorId(res, req.params.id)
})

//http://localhost:3005/api/by-rating/:rating => sanity check
router.get('/by-rating/:rating', (req, res) => {
    dao.findByRating(res, req.params.rating)
})

router.post('/create', (req, res)=> {
    dao.createMovie(req, res, dao.table)
})

router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router