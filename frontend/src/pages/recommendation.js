import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Recommendation() {

    /*const [carbs,setCarbs]=useState(0);
    const [calories,setCalories]=useState(0);*/
    const navigate=useNavigate();
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
        recommendations:[]
    });

    function goToDashboard(){
        navigate('/dashboard');
    }

    async function handlePage() {
        try{
            const token=localStorage.getItem("token");
            const response=await fetch('https://manormadhu.onrender.com/recommendation',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await response.json();
            console.log(data);
            setServerData(data);
            /*setCalories(data[0].total_calories||0);
            setCarbs(data[0].total_carbs||0)*/
        }
        catch(err){
            console.log(err.message);
        }
    }
            
    useEffect(()=>{handlePage()},[]);

    const styles = {
        container: { maxWidth: 900, margin: '24px auto', fontFamily: 'Arial, sans-serif', padding: 16, color: '#eef2ff' },
        header: { textAlign: 'center', marginBottom: 16, color: '#040952' },
        grid: { display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' },
        card: {
            flex: '1 1 320px',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 18,
            padding: 20,
            boxShadow: '0 12px 30px rgba(0,0,0,0.20)',
            border: '1px solid rgba(255,255,255,0.35)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            color: '#f7f9ff',
            minWidth: '280px'
        },
        stat: { textAlign: 'left', padding: '6px 0', color: 'black', fontFamily: 'cursive' },
        recItem: { fontStyle: 'italic', color: '#e8ebff', marginTop: 8 }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Personal Recommendations</h1>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <h3 style={{ color: '#05693b' }}>Summary</h3>
                    <div style={styles.stat}><strong>BMI:</strong> {serverData.BMI}</div>
                    <div style={styles.stat}><strong>Total Carbs (today):</strong> {serverData.total_carbs}</div>
                    <div style={styles.stat}><strong>Total Calories (today):</strong> {serverData.total_calories}</div>
                    <div style={styles.stat}><strong>Exercise Duration:</strong> {serverData.exerciseDuration}</div>

                    <h3 style={{ marginTop: 12, color: '#05693b' }}>Statuses</h3>
                    <div style={styles.stat}><strong>BMI Status:</strong> {serverData.status?.BMIStatus || 'Loading...'}</div>
                    <div style={styles.stat}><strong>Carbs Status:</strong> {serverData.status?.carbsStatus || 'Loading...'}</div>
                    <div style={styles.stat}><strong>Calorie Status:</strong> {serverData.status?.calorieStatus || 'Loading...'}</div>
                    <div style={styles.stat}><strong>Exercise Status:</strong> {serverData.status?.exerciseStatus || 'Loading...'}</div>
                </div>

                <div style={styles.card}>
                    <h3 style={{ color: '#8a0910', fontSize: 20 }}>Recommendations</h3>
                    <ul style={{textAlign: 'left', paddingLeft: 20, color: '#f2f6ff', fontFamily: 'cursive' }}>
                        {serverData.recommendations && serverData.recommendations.length > 0 ? 
                            (
                                serverData.recommendations.map((item, index) => {
                                    return (<li key={index} style={styles.recItem,{color: 'black'}}>{item}<br/><br/></li>)
                                })
                            )  : 
                            (
                                <p style={styles.recItem}>No recommendations yet.</p>
                            )
                        }
                    </ul>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button onClick={goToDashboard} style={{height:'80px',width:'160px',cursor:'pointer'}}>Back to Home</button>
            </div>
        </div>
    )
}

export default Recommendation;