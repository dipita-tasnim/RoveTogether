const express = require('express');
const {
    getRides,
    getRide,
    createRide,
    deleteRide,
    updateRide,
    getMyRides

} = require('../controllers/rideController')

const { authUser } = require('../middlewares/auth.middleware'); //  if you have it

const router = express.Router();

router.use(authUser); // Correct usage

//GET all rides
router.get('/', getRides)

//GET a single ride
router.get('/myrides', getMyRides);


router.get('/:id', getRide)

//POST a new ride
router.post('/', createRide)


//DELETE a ride
router.delete('/:id', deleteRide)

//UPDATE a ride
router.patch('/:id', updateRide)

// New route for logged-in user's rides
router.get('/myrides', getMyRides);

module.exports = router