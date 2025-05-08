import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (token) {
        try {
          const response = await fetch('/users/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          const json = await response.json();

          if (response.ok) {
            const { firstname, lastname } = json.fullname; // Assuming the server returns `fullname`
            setUserName(`${firstname ?? ""} ${lastname ?? ""}`.trim());
          } else {
            setError(json.message || "Failed to fetch profile");
          }
        } catch (err) {
          setError("Failed to fetch profile");
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <Link to="/">
          <h1 className="sidebar-title">RoveTogether</h1>
        </Link>

        <nav className="sidebar-nav">
          <Link to="/home" className="sidebar-link">Home</Link>
          <Link to="/myrides" className="sidebar-link">My Rides</Link>
          <Link to="/profile" className="sidebar-link">Profile</Link>
          <Link to="/logout" className="sidebar-link">Logout</Link>
        </nav>

        {/* Show logged-in user's name */}
        <div className="sidebar-user">
          {userName ? <>👤 {userName}</> : "Not logged in"}
        </div>

        {/* Show error message if there's an issue fetching the profile */}
        {error && <p>{error}</p>}
      </div>
    </aside>
  );
};

export default Sidebar;
