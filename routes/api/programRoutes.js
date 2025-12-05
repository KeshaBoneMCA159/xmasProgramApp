// Step 12 export router
const router = require('express')
.Router()
// Step 13 create program route http://localhost:3005/api/program
//sanity check
const { programDao: dao } = require('../../daos/dao')

router.get('/', (req, res) => {
    dao.findProgramInfo(res, dao.table)
})

//Step 15 create program sorting route http://localhost:3000/api/program/sort/:sorter
router.get('/sort/:sorter', (req, res) => {
    dao.sort(res, dao.table, req.params.sorter)
})

// Step 14 create program by id route http://localhost:3000/api/get_program/:id => sanity check
router.get('/get_program/:id', (req, res) => {
    dao.findProgramById(res, req.params.id)
})

// Step 23 create movie ratings route http://localhost:3000/api/by-rating/:rating => sanity check
router.get('/by-rating/:rating', (req, res) => {
    dao.findProgramsByRating(res, dao.table, req.params.rating)
})

module.exports = router