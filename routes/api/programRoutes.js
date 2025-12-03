// Step 12 export router
const router = require('express')
.Router()
// Step 13 create movie route http://localhost:3005/api/program
//sanity check
const { programDao: dao } = require('../../daos/dao')

//http://localhost:3005/api/program
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

module.exports = router