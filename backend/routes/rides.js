const express = require('express');
const {
  getRides,
  getRide,
  createRide,
  deleteRide,
  updateRide,
  getMyRides,
  updateRideStatus //  Import this from controller
} = require('../controllers/rideController');

const { authUser } = require('../middlewares/auth.middleware');

const { joinRide } = require('../controllers/rideController');

const router = express.Router();

router.use(authUser); //  Middleware for all routes

//  Routes
router.get('/', getRides);
router.get('/myrides', getMyRides);
router.get('/:id', getRide);
router.post('/', createRide);
router.delete('/:id', deleteRide);
router.patch('/:id', updateRide);
router.put('/:id/status', updateRideStatus); // This is your new route for status update
router.put('/:id/join', joinRide);


module.exports = router;
