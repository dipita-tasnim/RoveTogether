const mongoose = require('mongoose');

const Schema = mongoose.Schema

const rideSchema = new Schema({
    startingPoint: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {timestamps: true}) //timestamps should be included as second argumnt for taking the updated data by time
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',

module.exports = mongoose.model('Ride', rideSchema)

