const sosModel = require('../models/sos.model');
const userModel = require('../models/user.model');
const rideModel = require('../models/ride.model');

const sosController = {
    // Trigger SOS alert
    triggerSOS: async (req, res) => {
        try {
            const { userId, rideId, location } = req.body;
            
            // Create new SOS alert
            const sosAlert = new sosModel({
                userId,
                rideId,
                location
            });
            
            await sosAlert.save();
            
            // Get user and ride details for notification
            const user = await userModel.findById(userId);
            const ride = await rideModel.findById(rideId);
            
            // Here you would implement your notification logic
            // For example, sending an email or SMS to admin
            const adminNotification = {
                message: `SOS Alert has triggered. User ${user.fullname.firstname} ${user.fullname.lastname}'s ride was to ${ride.destination}. Please check immediately!`,
                userDetails: {
                    name: `${user.fullname.firstname} ${user.fullname.lastname}`,
                    email: user.email,
                    emergencyContact: user.emergencyContact
                },
                rideDetails: {
                    destination: ride.destination,
                    date: ride.date,
                    time: ride.time
                }
            };
            
            // TODO: Implement notification sending logic here
            
            res.status(200).json({
                success: true,
                message: 'SOS alert triggered successfully',
                data: sosAlert
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error triggering SOS alert',
                error: error.message
            });
        }
    },
    
    // Update emergency contact
    updateEmergencyContact: async (req, res) => {
        try {
            const { userId } = req.params;
            const { name, phone, email } = req.body;
            
            const user = await userModel.findByIdAndUpdate(
                userId,
                {
                    emergencyContact: {
                        name,
                        phone,
                        email
                    }
                },
                { new: true }
            );
            
            res.status(200).json({
                success: true,
                message: 'Emergency contact updated successfully',
                data: user.emergencyContact
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating emergency contact',
                error: error.message
            });
        }
    },
    
    // Get active SOS alerts (for admin)
    getActiveSOSAlerts: async (req, res) => {
        try {
            const activeAlerts = await sosModel.find({ status: 'active' })
                .populate('userId', 'fullname email emergencyContact')
                .populate('rideId', 'destination date time');
            
            res.status(200).json({
                success: true,
                data: activeAlerts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching active SOS alerts',
                error: error.message
            });
        }
    }
};

module.exports = sosController;