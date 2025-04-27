import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const RideForm = () => {
    const navigate = useNavigate();

    const [startingPoint, setStartingPoint] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [availableSlots, setAvailableSlots] = useState("");
    const [preference, setPreference] = useState("");
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault()



        const ride = {
            startingPoint, 
            destination, 
            date, 
            time, // Keep the original 24h time format
            availableSlots, 
            preference
        }
        const token = localStorage.getItem("token");
        const response = await fetch('/api/rides', {
            method: 'POST',
            body: JSON.stringify(ride),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const json = await response.json()

        if (!response.ok) {
            setError(json.error) //controller file has error property
        }
        if (response.ok){
            setStartingPoint('')
            setDestination('')
            setDate('')
            setTime('')
            setAvailableSlots('')
            setPreference('')
            setError(null)
            console.log('New Ride added', json)
            navigate('/home')
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create a New Post</h3>

            {error && <div className="error">{error}</div>}

            <label>Starting Point:</label>
            <input
                type="text"
                onChange={(e) => setStartingPoint(e.target.value)}
                value={startingPoint}  
            />    

            <label>Destination:</label>
            <input
                type="text"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}  
            />    
            <label>Date:</label>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
            />
            <label>Time:</label>
            <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
            />

            <label>Available Slots:</label>
            <input
                type="text"
                onChange={(e) => setAvailableSlots(e.target.value)}
                value={availableSlots}
            />
            {/* <label>Preference:</label> 
            <input
                type="text"
                onChange={(e) => setPreference(e.target.value)}
                value={preference}
            /> */}

            {/* update the preference to a dropdown for search bar */}
            <label>Preference:</label>
            <select 
                className="search-field"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
            >
                <option value="">Preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="any">Any</option>
            </select>

            
            <button className="post-button">+ POST</button>
        </form>
    )
}

export default RideForm