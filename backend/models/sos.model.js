const mongoose = require("mongoose");

const sosSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    rideId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ride',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'resolved', 'false_alarm'],
        default: 'active'
    },
    triggeredAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

sosSchema.index({ location: '2dsphere' });

const sosModel = mongoose.model('sos', sosSchema);

module.exports = sosModel;