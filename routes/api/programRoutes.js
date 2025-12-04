// Step 12 export router
const router = require('express')
.Router()
// Step 13 create movie route http://localhost:3005/api/program
//sanity check
const { programDao: dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findProgramInfo(res, dao.table)
})

// Step 14 create movie by id route http://localhost:3000/api/get_movie/:id => sanity check
router.get('/get_movie/:id', (req, res) => {
    dao.findById(res, dao.table, req.params.id)
})

module.exports = router