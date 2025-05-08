const express = require('express')
const {
  getRides,
  getRide,
  createRide,
  deleteRide,
  updateRide,
  getMyRides,
  searchRides     // ← import it!
} = require('../controllers/rideController')

const { authUser } = require('../middlewares/auth.middleware')

const router = express.Router()
router.use(authUser)

// 1. Search endpoint (must come before the “/:id” rule)
router.get('/search', searchRides)

// 2. List all rides
router.get('/', getRides)

// 3. Get current user’s rides
router.get('/myrides', getMyRides)

// 4. Get one ride by ID
router.get('/:id', getRide)

// 5. Create a new ride
router.post('/', createRide)

// 6. Update ride
router.patch('/:id', updateRide)

// 7. Delete ride
router.delete('/:id', deleteRide)

module.exports = router
