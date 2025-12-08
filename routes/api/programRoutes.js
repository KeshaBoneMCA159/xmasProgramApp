//export router
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005
//http://localhost:3005/api/program
//sanity check
const {programDao: dao } = require('../../daos/dao')

router.get('/', (req, res) => {
    dao.findProgramInfo(res, dao.table)
})

//http://localhost:3005/api/program/sort/:sorter
router.get('/sort/:sorter', (req, res) => {
    dao.sort(res, dao.table, req.params.sorter)
})

 // http://localhost:3005/api/program/:id => sanity check
router.get('/:id', (req, res) => {
    dao.findById(res, req.params.id)
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