const Ride = require('../models/rideModel')
const User = require('../models/user.model')
const mongoose = require('mongoose')

// get all rides
const getRides = async (req, res) => {
  try {
    const rides = await Ride.find({})
      .populate('user_id', 'fullname.firstname fullname.lastname email') // populate user details (only firstname and email)
      .sort({ createdAt: -1 }) // sort by newest first

    res.status(200).json(rides)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rides', error: error.message })
  }
}

// get a single ride
const getRide = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such ride' })
  }
  const ride = await Ride.findById(id)

  if (!ride) {
    return res.status(404).json({ error: 'No such ride' })
  }

  res.status(200).json(ride)
}

// get rides created by the logged-in user
const getMyRides = async (req, res) => {
  try {
    const userId = req.user._id
    const rides = await Ride.find({ user_id: userId }).sort({ createdAt: -1 })
    res.status(200).json(rides)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user rides' })
  }
}

// create a new ride
const createRide = async (req, res) => {
  const { startingPoint, destination, date, time, availableSlots, preference } = req.body

  try {
    const ride = await Ride.create({
      startingPoint,
      destination,
      date,
      time,
      availableSlots,
      preference,
      user_id: req.user._id // 👈 store who created it
    })

    res.status(200).json(ride)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a ride
const deleteRide = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such ride' })
  }

  const ride = await Ride.findOneAndDelete({ _id: id })

  if (!ride) {
    return res.status(404).json({ error: 'No such ride' })
  }

  res.status(200).json(ride)
}

// update a ride
const updateRide = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such ride' })
  }

  const ride = await Ride.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })

  if (!ride) {
    return res.status(404).json({ error: 'No such ride' })
  }
  res.status(200).json(ride)
}

// search for rides by query params
const searchRides = async (req, res) => {
  try {
    const { from, to, date, time } = req.query
    const filter = {}

    if (from) {
      filter.startingPoint = { $regex: new RegExp(from, 'i') }
    }
    if (to) {
      filter.destination = { $regex: new RegExp(to, 'i') }
    }
    if (date) {
      filter.date = date
    }
    if (time) {
      filter.time = time
    }

    const rides = await Ride.find(filter)
      .populate('user_id', 'fullname.firstname fullname.lastname email')
      .sort({ date: 1, time: 1 }) // earliest departures first

    res.status(200).json(rides)
  } catch (error) {
    res.status(500).json({ message: 'Ride search failed', error: error.message })
  }
}

module.exports = {
  getRides,
  getRide,
  getMyRides,
  createRide,
  deleteRide,
  updateRide,
  searchRides
}
