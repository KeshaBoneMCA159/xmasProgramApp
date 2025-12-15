// Step 5 export router
const express = require('express')
const router = express.Router()
const axios = require('axios')
const { paginationResults, buildProgramArr } = require('../helpers/pagination')
const PORT = process.env.PORT || 3005

router.use(express.static('public'))

// Homepage Route (localhost:3005)
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'xmas-program-app home',
    name: 'Merry Xmas program app',
    currentPage: 'home'
  })
})

// All Programs Display Page (The ONLY one that shows the All Movies/Shows links)
router.get('/allPrograms', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/program`

  const pageData = paginationResults(req)

  axios.get(url)
    .then(
      resp => {
        const allPrograms = resp.data

        // Remove duplicate titles (simple way: arrays + for loop + indexOf)
        let uniquePrograms = []
        let titlesSeen = []
//
        for (let i = 0; i < allPrograms.length; i++) {
          let title = (allPrograms[i].title || '').toLowerCase().trim()

          if (titlesSeen.indexOf(title) === -1) {
            titlesSeen.push(title)
            uniquePrograms.push(allPrograms[i])
          }
        }

        // Pagination calculations
        const totalPages = Math.max(1, Math.ceil(uniquePrograms.length / pageData.limit))
        const safePage = Math.min(Math.max(pageData.page, 1), totalPages)
        // This determines the start and end range of items to display
        const startIdx = (safePage - 1) * pageData.limit
        const endIdx = safePage * pageData.limit

        const paginatedResults = buildProgramArr(
          uniquePrograms,
          startIdx,
          endIdx,
          safePage
        )

        res.render('pages/allPrograms', {
          title: 'All Xmas Programs',
          name: 'All Xmas programs',
          currentPage: safePage,
          programData: paginatedResults.programs,
          prev: paginatedResults.prev,
          next: paginatedResults.next
        })
      },
      error => {
        next(error)
      }
    )
})

// All Movies Page
router.get('/movies', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/program/movies`

  axios.get(url)
    .then(
      resp => {
        res.render('pages/allMovies', {
          title: 'All Xmas Movies',
          name: 'All Xmas Movies',
          currentPage: 'movies',
          programData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// All Shows Page
router.get('/tvshows', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/program/tvshows`

  axios.get(url)
    .then(
      resp => {
        res.render('pages/allTVShows', {
          title: 'All Xmas TV Shows',
          name: 'All Xmas TV Shows',
          currentPage: ' TV shows',
          programData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// All Actors Page
router.get('/actor', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/actor`

  axios.get(url)
    .then(
      resp => {
        res.render('pages/allActors', {
          title: 'All Actors',
          name: 'All Actors',
          currentPage: 'actors',
          actorData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// All Directors Page
router.get('/director', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/director`

  axios.get(url)
    .then(
      resp => {
        res.render('pages/allDirectors', {
          title: 'All Directors',
          name: 'All Directors',
          currentPage: 'directors',
          directorData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// All Producers Page
router.get('/producer', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/producer`

  axios.get(url)
    .then(
      resp => {
        res.render('pages/allProducers', {
          title: 'All Producers',
          name: 'All Producers',
          currentPage: 'producers',
          producerData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// All Streaming Platforms Page
router.get('/stream', (req, res, next) => {
  const url = `http://localhost:${PORT}/api/streaming_platform`

  axios.get(url)
    .then(
      resp => {
        res.render('pages/allStreaming_Platforms', {
          title: 'All Streaming Platforms',
          name: 'All Streaming Platforms',
          currentPage: 'streaming platforms',
          streamingPlatformData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// Single Program Display Page
router.get('/program/:id', (req, res, next) => {
  const id = req.params.id
  const url = `http://localhost:${PORT}/api/program/${id}`
// Fetch program data from API
  axios.get(url)
    .then(
      resp => {
        const program = resp.data
        res.render('pages/single-Program', {
          title: `Xmas Program: ${program.title}`,
          name: 'Xmas Program Details',
          program: program,
          currentPage: 'programDetail',
          programData: resp.data
        })
      },
      error => {
        next(error)
      }
    )
})

// --- API ROUTES (Standard Setup) ---

// API Index
router.get('/api', (req, res) => {
  res.json({
    'All Programs': `http://localhost:${PORT}/api/program`,
    'All Actors': `http://localhost:${PORT}/api/actor`,
    'All Directors': `http://localhost:${PORT}/api/director`,
    'All Producers': `http://localhost:${PORT}/api/producer`,
    'All Movies': `http://localhost:${PORT}/api/program/movies`,
    'All TV Shows': `http://localhost:${PORT}/api/program/tvshows`,
    'All Streaming Platforms': `http://localhost:${PORT}/api/streaming_platform`
  })
})

// API endpoints
const apiEndpoints = [
  'program',
  'actor',
  'director',
  'producer',
  'streaming_platform'
]

apiEndpoints.forEach(endpoint => {
  router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})

// 404 page
router.use((req, res) => {
  res.status(404)
    .render('pages/404', {
      title: '404 Error',
      name: '🎄❄️🎄 You lookin\' for something?',
      currentPage: '404'
    })
})

module.exports = router