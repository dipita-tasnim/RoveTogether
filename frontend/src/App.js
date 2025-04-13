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




import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import RideForm from './components/RideForm';

import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="main-container">
          <Sidebar />
          <div className="content-area">
            <div className="pages">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<RideForm />} />
                {/* add more routes here like /my-rides, /profile */}
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
