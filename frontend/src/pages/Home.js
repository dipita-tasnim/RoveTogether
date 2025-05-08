import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// components
import RideDetails from "../components/RideDetails";

export default function Home() {
  const [rides, setRides] = useState(null);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    preference: ''
  });

  const fetchRides = async (params = {}) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Log the raw input date and time
      console.log('Raw input date:', params.date);
      console.log('Raw input time:', params.time);

      // Format date and time to match the format in the database
      const formattedParams = {
        ...params,
        date: params.date ? (() => {
          const date = new Date(params.date);
          const day = String(date.getDate()).padStart(2, '0');
          const month = date.toLocaleString('en-US', { month: 'long' });
          const year = date.getFullYear();
          return `${day} ${month}, ${year}`;
        })() : '',
        time: params.time ? (() => {
          const time = new Date(`1970-01-01T${params.time}`);
          const hour = time.getHours();
          const minute = String(time.getMinutes()).padStart(2, '0');
          const ampm = hour >= 12 ? 'pm' : 'am';
          const hour12 = hour % 12 || 12;
          return `${hour12}.${minute} ${ampm}`;
        })() : ''
      };

      // Log the formatted parameters
      console.log('Formatted search params:', formattedParams);

      const queryString = new URLSearchParams(formattedParams).toString();
      console.log('Query string:', queryString);

      const response = await fetch(`/api/rides?${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (response.ok) {
        // Log all rides from response
        console.log('All rides from response:', json.map(ride => ({
          date: ride.date,
          time: ride.time
        })));
        setRides(json);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search params before formatting:', searchParams);
    fetchRides(searchParams);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="home-wrapper">
      {/* Intro box */}
      <div className="home-card">
        <div className="home-header">
          <div>
            <h2 className="home-title">Create Your Ride and Find a Travel Buddy!</h2>
            <p className="home-subtext">
              Need to head somewhere? Create a post and find friends to share the journey with. It's fast, easy, and safe!
            </p>
          </div>
          <Link to="/create">
            <button className="create-new-post-button">+ Create New Post</button>
          </Link>
        </div>
      </div>

      {/* Search Bar Section */}
      <form onSubmit={handleSearch} className="search-bar-section">
        <input
          type="text"
          name="from"
          className="search-field"
          placeholder="From"
          value={searchParams.from}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="to"
          className="search-field"
          placeholder="To"
          value={searchParams.to}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          className="search-field"
          value={searchParams.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          className="search-field"
          value={searchParams.time}
          onChange={handleInputChange}
        />
        <select
          name="preference"
          className="search-field"
          value={searchParams.preference}
          onChange={handleInputChange}
        >
          <option value="">Preference</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Both">Male, Female</option>
        </select>
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* Ride listing */}
      <div className="ride-list">
        {rides && rides.map((ride) => (
          <RideDetails key={ride._id} ride={ride} />
        ))}
      </div>
    </div>
  );
}
