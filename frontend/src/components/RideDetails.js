const RideDetails = ({ride}) => {
    return (
        <div className="ride-details">
            <p className="ride-startingPoint"><strong>From:</strong> {ride.startingPoint}</p>
            <p className="ride-destination"><strong>To:</strong> {ride.destination}</p>
            <p className="ride-date"><strong>Date:</strong> {ride.date}</p>
            <p className="ride-time"><strong>Time:</strong> {ride.time}</p>
        </div>
    )
}   

export default RideDetails
