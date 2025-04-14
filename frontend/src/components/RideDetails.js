// const RideDetails = ({ride}) => {
//     return (
//         <div className="ride-details">
//             <p className="ride-startingPoint"><strong>From:</strong> {ride.startingPoint}</p>
//             <p className="ride-destination"><strong>To:</strong> {ride.destination}</p>
//             <p className="ride-date"><strong>Date:</strong> {ride.date}</p>
//             <p className="ride-time"><strong>Time:</strong> {ride.time}</p>
//         </div>
//     )
// }   

// export default RideDetails



const RideDetails = ({ ride }) => {
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
          <button className="join-button">Join Ride</button>
        </div>
      </div>
    );
  };
  
  export default RideDetails;
  
  