import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RideDetails = ({ ride }) => {
  const isOpen = ride.status === "open";
  const navigate = useNavigate();
  const joinedUsersKey = `joinedUsers_${ride._id}`;
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const user = JSON.parse(atob(token.split(".")[1]));
    const joinedUsers = JSON.parse(localStorage.getItem(joinedUsersKey)) || [];
    setIsJoined(joinedUsers.includes(user._id));
  }, [joinedUsersKey]);

  const toggleJoin = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    
    const user = JSON.parse(atob(token.split(".")[1]));
    const existingJoined = JSON.parse(localStorage.getItem(joinedUsersKey)) || [];
    const updatedJoined = isJoined 
      ? existingJoined.filter((id) => id !== user._id)
      : [...new Set([...existingJoined, user._id])];
    
    setIsJoined(!isJoined);
    localStorage.setItem(joinedUsersKey, JSON.stringify(updatedJoined));
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
             👥
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


