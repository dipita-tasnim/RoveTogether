const express = require('express');
const {
    getRides,
    getRide,
    createRide,
    deleteRide,
    updateRide

} = require('../controllers/rideController')


const router = express.Router();


//GET all rides
router.get('/', getRides)

//GET a single ride
router.get('/:id', getRide)

//POST a new ride
router.post('/', createRide)


//DELETE a ride
router.delete('/:id', deleteRide)

//UPDATE a ride
router.patch('/:id', updateRide)


module.exports = router