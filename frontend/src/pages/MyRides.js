import { useEffect, useState } from "react";

//search bar info at to specific variable
const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRides, setFilteredRides] = useState([]);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [searchPreference, setSearchPreference] = useState("");
  //

  //convert 24h time to 12h format
  const formatTimeTo12Hour = (time24h) => {
    if (!time24h) return "";
    
    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours, 10);
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12
    
    return `${hour12}:${minutes} ${ampm}`;
  };

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
          setFilteredRides(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError("Failed to fetch rides");
      }
    };
  
    fetchRides();
  }, []);
  
  const handleSearch = () => {
    let results = [...rides];
    
    if (searchFrom) {
      results = results.filter(ride => 
        ride.startingPoint.toLowerCase().includes(searchFrom.toLowerCase())
      );
    }
    
    if (searchTo) {
      results = results.filter(ride => 
        ride.destination.toLowerCase().includes(searchTo.toLowerCase())
      );
    }
    
    if (searchDate) {
      results = results.filter(ride => ride.date === searchDate);
    }
    
    if (searchTime) {
      results = results.filter(ride => ride.time === searchTime);
    }
    
    if (searchPreference.toLowerCase() !== 'any') {
      results = results.filter(ride => 
        ride.preference.toLowerCase() === searchPreference.toLowerCase()
      );
    }
    // If searchPreference is "any" or empty, we don't filter by preference
    
    setFilteredRides(results);
  };

  return (
    <div className="my-rides">
      <h2>My Rides</h2>
      
      {/* Search Bar Section */}
      <div className="search-bar-section">
        <input 
          type="text" 
          className="search-field" 
          placeholder="From" 
          value={searchFrom}
          onChange={(e) => setSearchFrom(e.target.value)}
        />
        <input 
          type="text" 
          className="search-field" 
          placeholder="To" 
          value={searchTo}
          onChange={(e) => setSearchTo(e.target.value)}
        />
        <input 
          type="date" 
          className="search-field"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <input 
          type="time" 
          className="search-field"
          value={searchTime}
          onChange={(e) => setSearchTime(e.target.value)}
        />
        <select 
          className="search-field"
          value={searchPreference}
          onChange={(e) => setSearchPreference(e.target.value)}
        >
          <option value="">Preference</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="any">Any</option>
        </select>
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
  {/* Search Bar Section End */}
  
  {/* show search items only */}
      
      {error && <p>{error}</p>}
      {filteredRides.length === 0 && <p>No rides found matching your search criteria.</p>}
      {filteredRides.map((ride) => (
        <div key={ride._id} className="ride-card">
          <h3>{ride.startingPoint} ➡ {ride.destination}</h3>
          <p><strong>Date:</strong> {ride.date}</p>
          <p><strong>Time:</strong> {formatTimeTo12Hour(ride.time)}</p>
          <p><strong>Slots:</strong> {ride.availableSlots}</p>
          <p><strong>Preference:</strong> {ride.preference}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRides;
