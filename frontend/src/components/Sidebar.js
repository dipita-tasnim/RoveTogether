import { Link } from "react-router-dom";



const Sidebar = () => {
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
      </div>
    </aside>
  );
};

export default Sidebar;
