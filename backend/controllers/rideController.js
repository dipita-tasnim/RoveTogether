const Ride = require('../models/rideModel')
const User = require('../models/user.model'); 
const mongoose = require('mongoose')

// get all rides
const getRides = async (req, res) => {
    try {
      const rides = await Ride.find({})
        .populate('user_id', 'fullname.firstname fullname.lastname email') // populate user details (only firstname and email)
        .sort({ createdAt: -1 }); // sort by newest first
  
      res.status(200).json(rides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch rides", error: error.message });
    }
  };
  

//get a single ride
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


// Get rides created by the logged-in user
const getMyRides = async (req, res) => {
    try {
      const userId = req.user._id;
      const rides = await Ride.find({ user_id: userId }).sort({ createdAt: -1 });
      res.status(200).json(rides);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user rides' });
    }
  };
  
  


//create a new ride
const createRide = async (req, res) => {
    const { startingPoint, destination, date, time, availableSlots, preference } = req.body

    //add doc to db
    try {
        const ride = await Ride.create({
            startingPoint,
            destination,
            date,
            time,
            availableSlots,
            preference,
            user_id: req.user._id // 👈 store who created it
        });

        res.status(200).json(ride)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a ride
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

//update a ride
const updateRide = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such ride' })
    }

    const ride = await Ride.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!ride) {
        return res.status(404).json({ error: 'No such ride' })
    }
    res.status(200).json(ride)
}


module.exports = {
    getRides,
    getRide,
    createRide,
    deleteRide,
    updateRide,
    getMyRides

}

