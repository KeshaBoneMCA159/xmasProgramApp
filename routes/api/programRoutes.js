// Step 12 export router
const express = require('express')
const router = express.Router()
const PORT = process.env.PORT || 3005
// Step 13 create program route http://localhost:3005/api/program
//sanity check
const {programDao: dao } = require('../../daos/dao')

router.get('/', (req, res) => {
    dao.findProgramInfo(res, dao.table)
})

//Step 15 create program sorting route http://localhost:3005/api/program/sort/:sorter
router.get('/sort/:sorter', (req, res) => {
    dao.sort(res, dao.table, req.params.sorter)
})

// Step 14 create program by id route http://localhost:3005/api/program/:id => sanity check
router.get('/:id', (req, res) => {
    dao.findById(res, req.params.id)
})

// Step 23 create movie ratings route http://localhost:3005/api/by-rating/:rating => sanity check
router.get('/by-rating/:rating', (req, res) => {
    dao.findByRating(res, dao.table, req.params.rating)
})

module.exports = router