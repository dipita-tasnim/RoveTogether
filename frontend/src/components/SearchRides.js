import { useState } from 'react'
import RideDetails from './RideDetails'

const SearchRides = () => {
  const [from, setFrom] = useState('')
  const [to, setTo]     = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [results, setResults] = useState([])
  const token = localStorage.getItem('token')

  const handleSearch = async (e) => {
    e.preventDefault()
    // build query string
    const params = new URLSearchParams({ from, to, date, time })
    const res = await fetch(`/rides/search?${params}`, {
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res.ok) {
      console.error('Search failed', await res.text())
      return
    }
    const data = await res.json()
    setResults(data)
  }

  return (
    <div className="search-rides">
      <h3>Find a Ride</h3>
      <form onSubmit={handleSearch}>
        <input
          placeholder="From"
          value={from}
          onChange={e => setFrom(e.target.value)}
        />
        <input
          placeholder="To"
          value={to}
          onChange={e => setTo(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="results">
        {results.length === 0
          ? <p>No rides found</p>
          : results.map(ride => (
              <RideDetails ride={ride} key={ride._id} />
            ))
        }
      </div>
    </div>
  )
}

export default SearchRides
