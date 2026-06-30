//import logo from './logo.svg';
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


/*function Home(){
  return (
    <div>
      <iframe
        src="/pages/index.html"
        width="100%"
        height="500px"
        title="Register"
    />
    </div>
    
  );
}
function Signin(){
  return (
    <iframe
      src="/pages/signin.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}
function Register(){
  return (
    <iframe
      src="/pages/register.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}
function Dashboard(){
  return (
    <iframe
      src="/pages/dashboard.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}
function SugarMonitor(){
  return (
    <iframe
      src="/pages/sugarMonitor.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}
function EmotionMonitor(){
  return (
    <iframe
      src="/pages/emotionTracking.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}
function WeeklyReport(){
  return (
    <iframe
      src="/pages/report.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}

function FoodTracking(){
  return (
    <iframe
      src="/pages/foodTracking.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}
function ExerciseMonitor(){
  return (
    <iframe
      src="/pages/exerciseMonitoring.html"
      width="100%"
      height="500px"
      title="Register"
    />
  );
}*/

function NavBar(){
  const [showProfile,setShowProfile]=useState(false);
  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  function signout(){
    localStorage.removeItem("token");
    navigate('/signin');
}

  
  return(
    <div className="navSection">
      <ul>
        
        {token && <>
                    <li><Link to="/dashboard" className="navCenter">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li onClick={signout} className="navRight" style={{ cursor: "pointer" ,position:'absolute' ,top:'0',right:'0',left:'100',paddingRight:'40px' }}>LogOut</li>
                    
                    <li><button className="profile-btn" onClick={()=>setShowProfile(true)}>☰</button></li>
                  </>}

        
        {!token && <>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/signin">Signin</Link></li>
                      <li><Link to="/register">Register</Link></li>
                    </>}
        
        
        <li><Link to="/dashboard"></Link></li>
        <li><Link to="/sugarMonitor"></Link></li>
        <li><Link to="/emotionMonitor"></Link></li>
        <li><Link to="/report"></Link></li>
        <li><Link to="/foodMonitor"></Link></li>
        <li><Link to="/exerciseMonitor"></Link></li>
        <li><Link to="/recommendation"></Link></li>
        <li><Link to="/weeklyreport"></Link></li>
      </ul>
    
    {
      showProfile && <Profile closeProfile={()=>setShowProfile(false)}/>
    }
    </div>
  );
}

function App() {
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
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
