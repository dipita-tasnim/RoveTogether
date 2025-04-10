const express = require('express');

const Ride = require ('../models/rideModel')

const router = express.Router();


//GET all rides
router.get('/', (req, res) => {
    res.json({mssg: 'GET all rides'})
})

//GET a single ride
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single ride'})
})

//POST a new ride
router.post('/', (req, res) => {
    const {startingPoint, destination, date, time} = req.body
    res.json({mssg: 'POST a new ride'})
})

//DELETE a ride
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a ride'})
})

//UPDATE a ride
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a ride'})
})


module.exports = router