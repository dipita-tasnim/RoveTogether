// const Home = () => {
//     return (
//         <div className="home">
//             <h2>Home</h2>
//         </div>
//     )
// }

// export default Home


import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

//components
import RideDetails from "../components/RideDetails";

export default function Home() {
  const [rides, setRides] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      const resposnse = await fetch("/api/rides");
      const json = await resposnse.json();

      if (resposnse.ok) {
        setRides(json);
      }
    };
    fetchRides();
  }, []);

  return (
    <div className="home-wrapper">
      {/* Intro box */}
      <div className="home-card">
        <div className="home-header">
          <div>
            <h2 className="home-title">Create Your Ride and Find a Travel Buddy!</h2>
            <p className="home-subtext">
              Need to head somewhere? Create a post and find friends to share the journey with. It’s fast, easy, and safe!
            </p>
          </div>
          <Link to="/create">
            <button className="create-new-post-button">+ Create New Post</button>
          </Link>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="search-bar-section">
        <input type="text" className="search-field" placeholder="From" />
        <input type="text" className="search-field" placeholder="To" />
        <input type="date" className="search-field" />
        <input type="time" className="search-field" />
        <select className="search-field">
          <option value="">Preference</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Both">Male, Female</option>
        </select>
        <button className="search-btn">Search</button>
      </div>



      {/* Ride listing now outside of the intro box */}
      <div className="ride-list">
        {rides && rides.map((ride) => (
          <RideDetails key={ride._id} ride={ride} />
        ))}
      </div>
    </div>
  );
}
