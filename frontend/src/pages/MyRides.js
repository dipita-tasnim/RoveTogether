import { useEffect, useState } from "react";

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await fetch('/api/rides/myrides', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const json = await response.json();
  
        if (response.ok) {
          setRides(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError("Failed to fetch rides");
      }
    };
  
    fetchRides();
  }, []);
  

  return (
    <div className="my-rides">
      <h2>My Rides</h2>
      {error && <p>{error}</p>}
      {rides.length === 0 && <p>No rides posted yet.</p>}
      {rides.map((ride) => (
        <div key={ride._id} className="ride-card">
          <h3>{ride.startingPoint} ➡ {ride.destination}</h3>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Time:</strong> {ride.time}</p>
          <p><strong>Slots:</strong> {ride.availableSlots}</p>
          <p><strong>Preference:</strong> {ride.preference}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRides;
