import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsAdmin(decoded.role === 'admin');
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();
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
          <Link to="/search-users" className="sidebar-link">Find & Rate Users</Link>
          <Link to="/profile" className="sidebar-link">Profile</Link>
          {isAdmin && (
            <Link to="/admin" className="sidebar-link admin-link">Admin Dashboard</Link>
          )}
          <Link to="/logout" className="sidebar-link">Logout</Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;