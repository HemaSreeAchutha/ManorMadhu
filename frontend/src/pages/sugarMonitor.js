import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function SugarMonitor(){
    const [beforeMeal,setBeforeMeal]=useState("");
    const [afterMeal,setAfterMeal]=useState("");
    const [finalResult,setFinalResult]=useState({});

    const navigate=useNavigate();

    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
        borderRadius: '24px',
        padding: '2rem',
        width: '400px',
        margin: '1.5rem auto'
    };

    function showResult(){
        return(
            <>
                <h2 style={{ textAlign: 'center', padding: '6px 0', color: 'brown', fontFamily: 'cursive',fontSize:'20px',marginRight:'50px'}}>Results</h2>
                <p style={{ textAlign: 'left', padding: '6px 0', color: 'black', fontFamily: 'cursive',fontSize:'16px'}}>Before Meal Status: <b>{finalResult.status?.beforeStatus}</b></p>
                <p style={{ textAlign: 'left', padding: '6px 0', color: 'black', fontFamily: 'cursive',fontSize:'16px'}}>After Meal Status: <b>{finalResult.status?.afterStatus}</b></p>
                <h3 style={{ textAlign: 'center', padding: '6px 0', color: 'brown', fontFamily: 'cursive',fontSize:'20px',marginRight:'40px'}}>Recommendations</h3>
                <ul style={{ textAlign: 'left', padding: '6px 0', color: 'black', fontFamily: 'cursive',fontSize:'16px'}}>
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
            
            <form className="sugarcontainer" style={glassStyle}>
                <div className="form-group">
                    <label htmlFor="beforeMeal">Enter Sugar Levels Before Meal:</label>
                    <input type="number" name="beforeMeal" id="beforeMeal" onChange={(e)=>setBeforeMeal(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="afterMeal">Enter Sugar Levels After Meal:</label>
                    <input type="number" name="afterMeal" id="afterMeal" onChange={(e)=>setAfterMeal(e.target.value)}/>
                
                </div>
                <button type="button" onClick={handleSubmit}>Save</button>
                {finalResult.recommendations && <ul>{showResult()}</ul>}
                <button type="button" onClick={()=>navigate('/dashboard')}>Continue</button>
            </form>
        </>
        
    );
}

export default SugarMonitor;