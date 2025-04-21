import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import RideForm from './components/RideForm';
import MyRides from './pages/MyRides';
import LoginForm from './components/LoginForm';
import RegForm from './components/RegForm';
import LandingPage from './components/LandingPage';
import MyProfile from './pages/MyProfile';
import Logout from './components/Logout';

import './index.css';

function AppLayout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/welcome", "/login", "/registration"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  const isLoggedIn = !!localStorage.getItem('user');

  return (
    <div className="main-container">
      {!shouldHideSidebar && <Sidebar />}
      <div className="content-area">
        <div className="pages">
          <Routes>
            <Route path="/" element={<Navigate to="/welcome" />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm />}
            />
            <Route
              path="/registration"
              element={isLoggedIn ? <Navigate to="/home" /> : <RegForm />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<RideForm />} />
            <Route path="/myrides" element={<MyRides />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
