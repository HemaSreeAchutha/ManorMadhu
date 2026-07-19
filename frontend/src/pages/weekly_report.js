import React, { useState,useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function WeeklyReport(){
     const [nutritions,setNutritions]=useState([]);
     const [report,setReport]=useState({
        weekly_report:[],
        avgCarbs:0,
        avgCalories:0,
        total_exercise:0,
        status:{
            carbsStatus:"",
            calorieStatus:"",
            exerciseStatus:""
        },
        recommendations:[]
     });
    const navigate=useNavigate();

    async function handlePage() {
        
        try{
            const token=localStorage.getItem("token");
            const response=await fetch('https://manormadhu.onrender.com/weeklyreport',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await response.json();
            console.log(data);
            setNutritions(data.weekly_report);
            setReport(data);
            
        }
        catch(err){
            console.log(err.message);
        }
        
    }

    function gotoDashboard(){
        navigate('/dashboard');
    }

    useEffect(()=>{handlePage()},[]);

    return (
        <div className="report-page">
            <h1 className="report-header">Weekly Nutrition & Exercise Report</h1>

            <div className="stats-strip">
                <div className="stat-box">
                    <span className="stat-box-icon">🍚</span>
                    <div className="stat-box-value">{report.avgCarbs}</div>
                    <div className="stat-box-label">Avg Carbs</div>
                </div>
                <div className="stat-box">
                    <span className="stat-box-icon">🔥</span>
                    <div className="stat-box-value">{report.avgCalories}</div>
                    <div className="stat-box-label">Avg Calories</div>
                </div>
                <div className="stat-box">
                    <span className="stat-box-icon">🏃</span>
                    <div className="stat-box-value">{report.total_exercise}</div>
                    <div className="stat-box-label">Total Exercise (mins)</div>
                </div>
            </div>

            <div className="report-grid">
                <div className="report-card">
                    <h3>Daily Summary</h3>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Carbs</th>
                                <th>Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.day}</td>
                                    <td>{item.total_carbs}</td>
                                    <td>{item.total_calories}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="report-card">
                    <h3>Recommendations</h3>
                    <div>
                        <h3 className="report-rec-title">Carbs Status</h3>
                        <div className="report-rec">{report.status?.carbsStatus || 'Loading...'}</div>
                        <p className="report-rec">{report.recommendations[0]}</p>

                        <h3 className="report-rec-title">Calorie Status</h3>
                        <div className="report-rec">{report.status?.calorieStatus || 'Loading...'}</div>
                        <p className="report-rec">{report.recommendations[1]}</p>

                        <h3 className="report-rec-title">Exercise Status</h3>
                        <div className="report-rec">{report.status?.exerciseStatus || 'Loading...'}</div>
                        <p className="report-rec">{report.recommendations[2]}</p>
                    </div>
                </div>
            </div>

            <div>
                <button onClick={gotoDashboard}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default WeeklyReport;