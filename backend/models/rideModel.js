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
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    availableSlots: {
        type: String,
        required: true
    },
    preference: {
        type: String,
        required: true
    },
    user_id: { // renamed from createdBy to match controller
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }

}, {timestamps: true}) //timestamps should be included as second argumnt for taking the updated data by time
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',

module.exports = mongoose.model('Ride', rideSchema)

