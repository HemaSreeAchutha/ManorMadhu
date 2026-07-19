import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
 
function Recommendation() {
 
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(true);
    const [serverData,setServerData]=useState({
        BMI:0,
        total_carbs:0,
        total_calories:0,
        exerciseDuration:0,
        status:{
            BMIStatus:"",
            carbsStatus:"",
            calorieStatus:"",
            exerciseStatus:""
        },
        recommendations:[],
        recommendation:{},
        userData:{}
    });
    //const [aiRecommendations,setAiRecommendations]=useState({});
 
    function goToDashboard(){
        navigate('/dashboard');
    }
 
    async function handlePage() {
        try{
            const token=localStorage.getItem("token");
            console.log(token);
            const response=await fetch('https://manormadhu.onrender.com/recommendation',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await response.json();
            console.log(data);
            setServerData(data);
            if(data.recommendation?.diet){
                setIsLoading(false);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    /*async function aiAPI(){
        const token=localStorage.getItem("token");
        const response=await fetch('http://localhost:5000/test-ai',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        const data=await response.json();
        console.log(data);
        setAiRecommendations(data);
    }*/
            
    useEffect(()=>{handlePage()},[]);
    //useEffect(()=>{aiAPI()},[]);
 
    return (
        <div className="report-page">
            <h1 className="report-header">Personal Recommendations</h1>
 
            <div className="report-grid">
                <div className="report-card">
                    <h3>Summary</h3>
                    <div className="report-stat"><strong>BMI:</strong> {serverData.BMI}</div>
                    <div className="report-stat"><strong>Total Carbs (today):</strong> {serverData.total_carbs}</div>
                    <div className="report-stat"><strong>Total Calories (today):</strong> {serverData.total_calories}</div>
                    <div className="report-stat"><strong>Exercise Duration:</strong> {serverData.exerciseDuration}</div>
 
                    <h3 className="report-rec-title">Statuses</h3>
                    <div className="report-stat"><strong>BMI Status:</strong> {serverData.status?.BMIStatus || 'Loading...'}</div>
                    <div className="report-stat"><strong>Carbs Status:</strong> {serverData.status?.carbsStatus || 'Loading...'}</div>
                    <div className="report-stat"><strong>Calorie Status:</strong> {serverData.status?.calorieStatus || 'Loading...'}</div>
                    <div className="report-stat"><strong>Exercise Status:</strong> {serverData.status?.exerciseStatus || 'Loading...'}</div>
                </div>
 
                <div className="report-card">
                    <h3>Quick Recommendations</h3>
                    <ul className="rec-list">
                        {serverData.recommendations && serverData.recommendations.length > 0 ? 
                            (
                                serverData.recommendations.map((item, index) => {
                                    return (<li key={index} className="report-rec"> {item} </li>)
                                })
                            )  : 
                            (
                                <p className="report-rec">Loading...</p>
                            )
                        }
                    </ul>
                </div>
            </div>

            <div className="ai-rec-card">
                <div className="ai-rec-heading">
                    <span className="ai-rec-badge">🤖 AI-Powered</span>
                    <h3>Personalized Insights</h3>
                </div>

                {isLoading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Analyzing your health data...</p>
                        <p className="loading-subtext">Please wait a few seconds.</p>
                    </div>
                ) : (
                    <div className="ai-rec-grid">
                        <div className="ai-rec-item">
                            <span className="ai-rec-icon">🥗</span>
                            <div>
                                <h4>Diet</h4>
                                <p>{serverData.recommendation?.diet}</p>
                            </div>
                        </div>
                        <div className="ai-rec-item">
                            <span className="ai-rec-icon">🏃</span>
                            <div>
                                <h4>Exercise</h4>
                                <p>{serverData.recommendation?.exercise}</p>
                            </div>
                        </div>
                        <div className="ai-rec-item">
                            <span className="ai-rec-icon">🚫</span>
                            <div>
                                <h4>Foods to Avoid</h4>
                                <p>{serverData.recommendation?.foodsToAvoid}</p>
                            </div>
                        </div>
                        <div className="ai-rec-item">
                            <span className="ai-rec-icon">🌿</span>
                            <div>
                                <h4>Lifestyle</h4>
                                <p>{serverData.recommendation?.lifestyle}</p>
                            </div>
                        </div>
                        <div className="ai-rec-item">
                            <span className="ai-rec-icon">✨</span>
                            <div>
                                <h4>Motivation</h4>
                                <p>{serverData.recommendation?.motivation}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
 
            <div>
                <button onClick={goToDashboard}>Back to Home</button>
            </div>
        </div>
    )
}
 
export default Recommendation;