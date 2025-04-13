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
      }
      fetchRides()
    }, []);
    
    return (
      <div className="home-wrapper">
        <div className="home-card">
          <div className="home-header">
            <div>
              <h2 className="home-title">Create Your Ride and Find a Travel Buddy!</h2>
              <p className="home-subtext">Need to head somewhere? Create a post and find friends to share the journey with. It’s fast, easy, and safe!</p>
            </div>
            <Link to="/create">
              <button className="create-new-post-button">+ Create New Post</button>
            </Link>
          </div>
          <div className="rides">
            {rides && rides.map((ride) => (
              <RideDetails key={ride._id} ride={ride} />
            ))}
          </div>
        </div>
      </div>
    );  
  }
  