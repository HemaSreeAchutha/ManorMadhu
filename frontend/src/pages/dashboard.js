import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
 
 
function Dashboard(){
    const navigate=useNavigate();
 
    function goToSugar() {
        navigate("/sugarMonitor");
    }
    function goToInput() {
        navigate("/emotionMonitor");
    }
    function goToReport() {
        navigate("/report");
    }
    function goToExercise() {
        navigate("/exerciseMonitor");
    }
 
    return (
        <>
            <div className="dash-wrap">
                <div className="dash-heading">
                    <span className="home-badge">Today's overview</span>
                    <h1 className="dash-title">Welcome back</h1>
                    <p className="dash-subtitle">Pick up where you left off — log today's numbers or check your progress.</p>
                </div>
 
                <div className="dash-grid">
                    <div className="cardcontainer dash-card" onClick={goToSugar}>
                        <span className="dash-card-icon">🩸</span>
                        <h3>Add Sugar Levels</h3>
                        <p>Log today's blood sugar reading</p>
                    </div>
                    <div className="cardcontainer dash-card" onClick={goToInput}>
                        <span className="dash-card-icon">🍽️</span>
                        <h3>Track Today's Food and Emotion</h3>
                        <p>Record what you ate and how you feel</p>
                    </div>
                    <div className="cardcontainer dash-card" onClick={goToReport}>
                        <span className="dash-card-icon">📊</span>
                        <h3>View Weekly Report</h3>
                        <p>See your trends over the past week</p>
                    </div>
                    <div className="cardcontainer dash-card" onClick={goToExercise}>
                        <span className="dash-card-icon">🧘</span>
                        <h3>Add Today's Physical Activity</h3>
                        <p>Log a walk, yoga session, or workout</p>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Dashboard;
 