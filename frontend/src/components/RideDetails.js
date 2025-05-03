// const RideDetails = ({ ride }) => {
//   const isOpen = ride.status === "open";

//   return (
//     <div className="ride-card">
//       <div className="ride-from-to-wrapper">
//         <div className="ride-from">
//           <strong>{ride.startingPoint}</strong>
//           <span>From</span>
//         </div>
//         <div className="horizontal-divider" />
//         <div className="ride-to">
//           <strong>{ride.destination}</strong>
//           <span>To</span>
//         </div>
//       </div>

//       <div className="ride-bottom-row">
//         <div className="ride-detail-block">
//           <span className="detail-title">Date</span>
//           <span>{ride.date}</span>
//         </div>
//         <div className="ride-thin-divider" />
//         <div className="ride-detail-block">
//           <span className="detail-title">Time</span>
//           <span>{ride.time}</span>
//         </div>
//         <div className="ride-thin-divider" />
//         <div className="ride-detail-block">
//           <span className="detail-title">Slots</span>
//           <span>{ride.availableSlots}</span>
//         </div>
//         <div className="ride-thin-divider" />
//         <div className="ride-detail-block">
//           <span className="detail-title">Preference</span>
//           <span>{ride.preference}</span>
//         </div>
//         <div className="ride-thin-divider" />

//         <div className="join-section">
//           <div className="join-icon" onClick={() => console.log("Emoji clicked!")}>
//             👤
//           </div>
//           <button
//             className="join-button"
//             disabled={!isOpen}
//           >
//             Join Ride
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default RideDetails;







// import { useNavigate } from "react-router-dom";

// const RideDetails = ({ ride }) => {
//   const isOpen = ride.status === "open";
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     if (ride.joinedUserId) {
//       navigate(`/user/${ride.joinedUserId}`);
//     } else {
//       alert("No rider has joined this ride yet.");
//     }
//   };

//   return (
//     <div className="ride-card">
//       <div className="ride-from-to-wrapper">
//         <div className="ride-from">
//           <strong>{ride.startingPoint}</strong>
//           <span>From</span>
//         </div>
//         <div className="horizontal-divider" />
//         <div className="ride-to">
//           <strong>{ride.destination}</strong>
//           <span>To</span>
//         </div>
//       </div>

//       <div className="ride-bottom-row">
//         <div className="ride-detail-block">
//           <span className="detail-title">Date</span>
//           <span>{ride.date}</span>
//         </div>
//         <div className="ride-thin-divider" />
//         <div className="ride-detail-block">
//           <span className="detail-title">Time</span>
//           <span>{ride.time}</span>
//         </div>
//         <div className="ride-thin-divider" />
//         <div className="ride-detail-block">
//           <span className="detail-title">Slots</span>
//           <span>{ride.availableSlots}</span>
//         </div>
//         <div className="ride-thin-divider" />
//         <div className="ride-detail-block">
//           <span className="detail-title">Preference</span>
//           <span>{ride.preference}</span>
//         </div>
//         <div className="ride-thin-divider" />

//         <div className="join-section">
//           {/* 👤 emoji button */}
//           <button className="join-icon" onClick={handleProfileClick} title="View Rider Profile">
//             👤
//           </button>

//           {/* Join Ride button */}
//           <button
//             className="join-button"
//             disabled={!isOpen}
//             onClick={() => {
//               // Optional: Call API to join ride here
//               console.log("Join Ride clicked");
//             }}
//           >
//             Join Ride
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RideDetails;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RideDetails = ({ ride }) => {
  const isOpen = ride.status === "open";
  const navigate = useNavigate();
  const localStorageKey = `joined_${ride._id}`;

  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    setIsJoined(stored === "true");
  }, [localStorageKey]);

  const toggleJoin = () => {
    const newStatus = !isJoined;
    setIsJoined(newStatus);
    localStorage.setItem(localStorageKey, newStatus.toString());

    const token = localStorage.getItem('token');
    if (newStatus && token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem(`joinedUserId_${ride._id}`, user._id);
    } else if (!newStatus) {
      localStorage.removeItem(`joinedUserId_${ride._id}`);
    }

    console.log(newStatus ? "Joined ride" : "Left ride");
  };

  const handleProfileClick = () => {
    navigate(`/ride-confirmation?rideId=${ride._id}`);
  };

  return (
    <div className="ride-card">
      <div className="ride-from-to-wrapper">
        <div className="ride-from">
          <strong>{ride.startingPoint}</strong>
          <span>From</span>
        </div>
        <div className="horizontal-divider" />
        <div className="ride-to">
          <strong>{ride.destination}</strong>
          <span>To</span>
        </div>
      </div>

      <div className="ride-bottom-row">
        <div className="ride-detail-block">
          <span className="detail-title">Date</span>
          <span>{ride.date}</span>
        </div>
        <div className="ride-thin-divider" />
        <div className="ride-detail-block">
          <span className="detail-title">Time</span>
          <span>{ride.time}</span>
        </div>
        <div className="ride-thin-divider" />
        <div className="ride-detail-block">
          <span className="detail-title">Slots</span>
          <span>{ride.availableSlots}</span>
        </div>
        <div className="ride-thin-divider" />
        <div className="ride-detail-block">
          <span className="detail-title">Preference</span>
          <span>{ride.preference}</span>
        </div>
        <div className="ride-thin-divider" />

        <div className="join-section">
          <button
            className="join-icon"
            onClick={handleProfileClick}
            title="View Rider Profile"
          >
            👤
          </button>

          <button
            className={`join-button ${isJoined ? "joined" : ""}`}
            disabled={!isOpen}
            onClick={toggleJoin}
          >
            {isJoined ? "Joined" : "Join Ride"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;


