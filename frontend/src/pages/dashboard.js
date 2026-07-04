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
            <div style={{position:'fixed',top:100,left:0,width:'100%',height:'100%',zIndex:-1}}>
                <h1>Welcome Home</h1>
                <div style={{display: 'flex'}}>
                    <div className="cardcontainer" onClick={goToSugar}><p> Add Sugar Levels</p></div>
                    <div  className="cardcontainer" onClick={goToInput}><p>Track Today's Food and Emotion</p></div>

                </div>
                <div style={{display: 'flex'}}>
                    <div className="cardcontainer" onClick={goToReport}
                    ><p>View weekly Report</p></div>
                    <div className="cardcontainer" onClick={goToExercise}><p>Add Today's Physical Activity</p></div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;