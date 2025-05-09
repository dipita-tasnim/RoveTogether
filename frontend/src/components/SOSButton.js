import React, { useState } from 'react';
import axios from 'axios';

const SOSButton = ({ rideId }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSOS = async () => {
        try {
            setIsLoading(true);
            // Get current location
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                
                // Send SOS alert
                await axios.post('/api/sos/trigger', {
                    rideId,
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    }
                });
                
                alert('SOS alert has been sent. Help is on the way!');
            });
        } catch (error) {
            console.error('Error sending SOS:', error);
            alert('Error sending SOS alert. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSOS}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        >
            {isLoading ? 'Sending...' : 'SOS'}
        </button>
    );
};

export default SOSButton;