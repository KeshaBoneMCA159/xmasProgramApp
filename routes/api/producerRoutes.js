const express = require('express')
const router = express.Router()

const { producerDao: dao } = require('../../daos/dao')

// http://localhost:3005/api/producer
router.get('/', (req, res) => {
  dao.findAllProducers(res, dao.table)
})

// http://localhost:3005/api/producer/sort/:sorter
router.get('/sort/:sorter', (req, res) => {
  dao.sort(res, dao.table, req.params.sorter)
})

// http://localhost:3005/api/producer/get_programs/:id
router.get('/get_programs/:id', (req, res) => {
  dao.findProgramsByProducerId(res, req.params.id)
})

// http://localhost:3005/api/producer/by-rating/:rating
router.get('/by-rating/:rating', (req, res) => {
  dao.findByRating(res, req.params.rating)
})

// http://localhost:3005/api/producer/:id
router.get('/:id', (req, res) => {
  dao.findById(res, req.params.id)
})

router.post('/create', (req, res) => {
  dao.create(req, res, dao.table, req.body)
})

router.patch('/update/:id', (req, res) => {
  dao.update(req, res, dao.table, req.body, req.params.id)
})

module.exports = router
