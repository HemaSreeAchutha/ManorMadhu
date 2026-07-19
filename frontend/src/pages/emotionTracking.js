import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
 
function EmotionMonitor(){
    const [emotion,setEmotion]=useState("");
    const navigate=useNavigate();
 
    async function handleSubmit(){
        if(!emotion){
            alert("Please select an emotion");
            return;
        }
        try{
            const token=localStorage.getItem("token");
            const response=await fetch('https://manormadhu.onrender.com/emotion',{
                method:'POST',
                headers:{'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({emotion})
            });
            const data=await response.json();
            console.log(data);
            navigate('/foodMonitor');
        }
        catch(err){
            console.log(err);
        }
        
    }
 
    return (
        <>
        <div className="emotion-page">
            <h1>😊 Enter Your Emotion 😊</h1>
            <div className="emotioncontainer">
                <label htmlFor="emotion">Share your present Emotion😊</label>
 
                <select id="emotion" className="emotion-select" value={emotion} onChange={(e)=>setEmotion(e.target.value)}>
                    <option value="">-- Choose emotion --</option>
                    <option value="Happy">😊Happy</option>
                    <option value="Calm">😌Calm</option>
                    <option value="Motivated">💪Motivated	</option>
                    <option value="Stressed">😰Stressed</option>
                    <option value="CravingSugar">🍩Craving Sugar</option>                  
                    <option value="Angry">😠Angry</option>
                    <option value="Tired">😴Tired</option>
                    <option value="Anxious">😟Anxious</option>
                    <option value="Guilty">😔Guilty</option>
                    <option value="Energetic">⚡Energetic</option>
                </select>
            </div>
            <button onClick={handleSubmit}>Next</button>
        </div>
        </>
    );
}
 
export default EmotionMonitor;
 