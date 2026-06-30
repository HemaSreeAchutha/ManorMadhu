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
            const response=await fetch('http://localhost:5000/weeklyreport',{
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

    const styles = {
        container: { maxWidth: 900, margin: '24px auto', fontFamily: 'Arial, sans-serif', padding: 16, color: '#eef2ff' },
        header: { textAlign: 'center', marginBottom: 16, color: '#040952' },
        grid: { display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' },
        card: {
            flex: '1 1 280px',
            background: 'rgba(255,255,255,0.14)',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.20)',
            border: '1px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            color: '#f7f9ff',
            minWidth: '280px'
        },
        table: { border: '2px solid rgba(255, 255, 255, 0.93)', color: '#eef2ff', width: '100%', borderCollapse: 'collapse' },
        th: { textAlign: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.15)', color: '#010513', border: '1px solid rgba(255, 255, 255, 0.93)' },
        td: { padding: '8px 12px', border: '1px solid rgba(255, 255, 255, 0.93)', color: '#01030c' },
        stat: { textAlign: 'center', padding: 12, color: '#01040e', fontFamily: 'cursive'},
        rec: { fontStyle: 'italic', color: '#01030f', textAlign: 'center', marginTop: 8 , fontFamily: 'cursive' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Weekly Nutrition & Exercise Report</h1>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <h3 style={{ color: '#064922' }}>Daily Summary</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Carbs</th>
                                <th style={styles.th}>Calories</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nutritions.map((item, index) => (
                                <tr key={index}>
                                    <td style={styles.td}>{item.day}</td>
                                    <td style={styles.td}>{item.total_carbs}</td>
                                    <td style={styles.td}>{item.total_calories}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={styles.card}>
                    <h3 style={{ color: '#05693b' }}>Weekly Stats</h3>
                    <div style={styles.stat}><strong>Average Carbs:</strong> {report.avgCarbs}</div>
                    <div style={styles.stat}><strong>Average Calories:</strong> {report.avgCalories}</div>
                    <div style={styles.stat}><strong>Total Exercise (mins):</strong> {report.total_exercise}</div>
                </div>
                            
                <div style={styles.card}>
                    <h2 style={{ color: '#8a0910' }}>Recommendations</h2>
                    <div>
                        <h3 style={{ color: '#4f530a', textDecoration: 'underline' }}>Carbs Status</h3>
                        <div style={styles.rec}>{report.status?.carbsStatus || 'Loading...'}</div>
                        <p style={styles.rec}>{report.recommendations[0]}</p>

                        <h3 style={{ color: '#4f530a', textDecoration: 'underline' }}>Calorie Status</h3>
                        <div style={styles.rec}>{report.status?.calorieStatus || 'Loading...'}</div>
                        <p style={styles.rec}>{report.recommendations[1]}</p>

                        <h3 style={{ color: '#4f530a', textDecoration: 'underline' }}>Exercise Status</h3>
                        <div style={styles.rec}>{report.status?.exerciseStatus || 'Loading...'}</div>
                        <p style={styles.rec}>{report.recommendations[2]}</p>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button onClick={gotoDashboard} style={{height:'70px',width:'150px',cursor:'pointer'}}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default WeeklyReport;