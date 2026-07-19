import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
 
function SugarMonitor(){
    const [beforeMeal,setBeforeMeal]=useState("");
    const [afterMeal,setAfterMeal]=useState("");
    const [finalResult,setFinalResult]=useState({});
 
    const navigate=useNavigate();
 
    function showResult(){
        return(
            <>
                <h2>Results</h2>
                <p>Before Meal Status: <b>{finalResult.status?.beforeStatus}</b></p>
                <p>After Meal Status: <b>{finalResult.status?.afterStatus}</b></p>
                <h3>Recommendations</h3>
                <ul>
                    {finalResult.recommendations?.map((item,index)=>{
                        return <li key={index}>{item}</li>;
                    })}
                </ul>
            </>
        )
    }
 
 
 
        async function handleSubmit(e) {
            const token=localStorage.getItem("token");
            e.preventDefault();
            if(!beforeMeal || !afterMeal){
                alert("Please fill all the inputs");
                return;
            }
            try{
                const response=await fetch('https://manormadhu.onrender.com/sugar-level-page',
                    {
                        method:'POST',
                        headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
                        body:JSON.stringify({beforeMeal,afterMeal})
                    }
                )
                const data=await response.json();
                if(data.success){
                    setFinalResult(data);
                    showResult();
                    alert('sugar levels saved');
                    
                }
            }
            catch(err){
                console.log(err);
            }
            
        }
 
 
    
    return(
        <>
            <h1 className="l2container"> If you had a sugar test recently then enter your sugar test results </h1>
            
            <form className="sugarcontainer">
                <div className="form-group">
                    <label htmlFor="beforeMeal">Enter Sugar Levels Before Meal:</label>
                    <input type="number" name="beforeMeal" id="beforeMeal" onChange={(e)=>setBeforeMeal(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="afterMeal">Enter Sugar Levels After Meal:</label>
                    <input type="number" name="afterMeal" id="afterMeal" onChange={(e)=>setAfterMeal(e.target.value)}/>
                
                </div>
                <button type="button" onClick={handleSubmit}>Save</button>
                {finalResult.recommendations && <div className="sugar-results">{showResult()}</div>}
                <button type="button" onClick={()=>navigate('/dashboard')}>Continue</button>
            </form>
        </>
        
    );
}
 
export default SugarMonitor;
 