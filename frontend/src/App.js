// import {BrowserRouter , Routes, Route} from 'react-router-dom'


// //pages & components
// import Home from './pages/Home'
// import Navbar from './components/Navbar'

// // import Login from './pages/Login'
// // import Register from './pages/Register'

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <div className="pages">
//           <Routes>
//             <Route path="/" element={<Home />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
      
//     </div>
//   );
// }

// export default App;




// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// // pages & components
// import Home from './pages/Home';
// import Sidebar from './components/Sidebar';
// import RideForm from './components/RideForm';
// import MyRides from './pages/MyRides';

// import './index.css';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <div className="main-container">
//           <Sidebar />
//           <div className="content-area">
//             <div className="pages">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/create" element={<RideForm />} />
//                 <Route path="/myrides" element={<MyRides />} />
//                 {/* add more routes here like /my-rides, /profile */}
//               </Routes>
//             </div>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import RideForm from './components/RideForm';
import MyRides from './pages/MyRides';
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import 'remixicon/fonts/remixicon.css'



import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <div className="main-container">
          <Sidebar /> {/* Sidebar for navigation */}
          
          <div className="content-area">
            <div className="pages">
              <Routes>
                {/* Main routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<RideForm />} />
                    <Route path="/myrides" element={<MyRides />} />
                    <Route path="/register" element={<UserSignup />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="*" element={<div>404 Page Not Found</div>} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
