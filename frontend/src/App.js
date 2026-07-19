import './App.css';
import { Routes,Route,Link } from 'react-router-dom';
import SelectExercise from './pages/exerciseMonitor';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Signin from './pages/signin';
import SugarMonitor from './pages/sugarMonitor';
import EmotionMonitor from './pages/emotionTracking';
import Register from './pages/register';
import FoodTracking from './pages/foodTracking';
import Recommendation from './pages/recommendation';
import WeeklyReport from './pages/weekly_report';
import Profile from './pages/profile';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './pages/protectedRoute';
import About from './pages/about';
import logo from './assets/logo.png';
 
function NavBar(){
  const [showProfile,setShowProfile]=useState(false);
  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  function signout(){
    localStorage.removeItem("token");
    navigate('/signin');
  }
 
  return(
    <nav className="navSection">
      {/* ManorMadhu brand mark — your uploaded artwork */}
      <Link to={token ? "/dashboard" : "/"} className="brand-logo">
        <img src={logo} alt="ManorMadhu logo" className="brand-icon" />
        <span className="brand-text-group">
          <span className="brand-text">Manor<span className="brand-accent">Madhu</span></span>
          <span className="brand-tagline">The Diabetes Tracker</span>
        </span>
      </Link>
 
      <ul className="nav-links">
 
        {token && <>
                    <li><Link to="/dashboard" className="navCenter">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/recommendation">Recommendations</Link></li>
                    <li onClick={signout} className="navRight nav-logout">LogOut</li>
                    <li><button className="profile-btn" onClick={()=>setShowProfile(true)}>☰</button></li>
                  </>}
 
 
        {!token && <>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/signin">Signin</Link></li>
                      <li><Link to="/register" className="nav-cta">Register</Link></li>
                    </>}
 
 
        <li className="nav-hidden"><Link to="/dashboard"></Link></li>
        <li className="nav-hidden"><Link to="/sugarMonitor"></Link></li>
        <li className="nav-hidden"><Link to="/emotionMonitor"></Link></li>
        <li className="nav-hidden"><Link to="/report"></Link></li>
        <li className="nav-hidden"><Link to="/foodMonitor"></Link></li>
        <li className="nav-hidden"><Link to="/exerciseMonitor"></Link></li>
        <li className="nav-hidden"><Link to="/recommendation"></Link></li>
        <li className="nav-hidden"><Link to="/weeklyreport"></Link></li>
      </ul>
 
    {
      showProfile && <Profile closeProfile={()=>setShowProfile(false)}/>
    }
    </nav>
  );
}
 
function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sugarMonitor" element={<ProtectedRoute><SugarMonitor /></ProtectedRoute>} />
        <Route path="/emotionMonitor" element={<ProtectedRoute><EmotionMonitor /></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><WeeklyReport /></ProtectedRoute>} />
        <Route path="/foodMonitor" element={<ProtectedRoute><FoodTracking /></ProtectedRoute>} />
        <Route path="/exerciseMonitor" element={<ProtectedRoute><SelectExercise /></ProtectedRoute>} />
        <Route path='/recommendation' element={<ProtectedRoute><Recommendation /></ProtectedRoute>} />
        <Route path='/weeklyreport' element={<ProtectedRoute><WeeklyReport /></ProtectedRoute>} />
        <Route path='/about' element={<About />} />
        {/*<Route path='/profile' element={<Profile />} />*/}
      </Routes>
    </div>
  );
}
 
export default App;
 