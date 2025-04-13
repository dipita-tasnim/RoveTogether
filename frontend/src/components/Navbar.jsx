import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div>
            <Link to="/" className="text-2xl font-bold">RoveTogether</Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hover:text-blue-200 transition">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;