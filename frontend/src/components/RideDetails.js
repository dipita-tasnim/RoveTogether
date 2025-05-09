import { useState } from "react";

const RideDetails = ({ ride }) => {
  const [activeStatus, setActiveStatus] = useState("open"); // "" | "open" | "closed"

  // Helper function to convert 24h time to 12h format
  const formatTimeTo12Hour = (time24h) => {
    if (!time24h) return "";
    
    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours, 10);
    
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12; // Convert 0 to 12
    
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleOpenClick = () => {
    setActiveStatus("open");
  };
  
  const handleClosedClick = () => {
    setActiveStatus("closed");
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
          <span>{formatTimeTo12Hour(ride.time)}</span>
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

        <button
        className="join-button"
        disabled={activeStatus !== "open"}
      >
        Join Ride
      </button>
      </div>

      <div className="status-buttons">
      <button
        className={`status-button ${activeStatus === "open" ? "active-open" : ""}`}
        onClick={handleOpenClick}
      >
        Open
      </button>
      <button
        className={`status-button ${activeStatus === "closed" ? "active-closed" : ""}`}
        onClick={handleClosedClick}
      >
        Closed
      </button>
    </div>
      </div>
    );
  };

export default RideDetails;


