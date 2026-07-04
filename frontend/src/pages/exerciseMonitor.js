import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
//import { response } from 'express';
//import ReactDOM from 'react-dom/client';
//import reportWebVitals from './reportWebVitals';
function OnlySelectOption({index,exercise,duration,updatedValue,selectedExercise}){
    
    const choosedOtions=selectedExercise.map((item)=>item.exercise).filter((item)=>item!=="");
    const exerciseOptions=['walk','jogging','skipping','yoga','sports','meditation','cycling','karate','dancing','swimming'];
    return (
        <>
        <select value={exercise} id={`exercise-${index}`} onChange={(e)=>{updatedValue(index,"exercise",e.target.value)}}>
            <option value="">--Select exercise</option>
            {
                exerciseOptions.filter((item)=>
                    !choosedOtions.includes(item)||item===exercise)
                .map((item)=>(
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))
            }
        </select>
        <input type='text' placeholder='duration(min)' value={duration} id={`duration-${index}`} onChange={(e)=>{updatedValue(index,"duration",e.target.value)}}></input>
        </>
    );
}

function SelectExercise(){
    const navigate=useNavigate();
    const [selectedExercise,setSelectedExercise]=useState([{exercise:"",duration:""}]);
    function updateExercise(index,field,value){
        const updated=[...selectedExercise];
        updated[index][field]=value;
        setSelectedExercise(updated);
    }
    function addExercise(){
        setSelectedExercise([...selectedExercise,{exercise:"",duration:""}]);
    }
    async function submitExercise(e){
        const validExercises = selectedExercise.filter(
            item => item.exercise && item.duration
        );

        if(validExercises.length === 0){
            alert("Please select at least one exercise");
            return;
        }
        e.preventDefault();
        try{
            const token=localStorage.getItem("token");
            const response=await fetch('https://manormadhu.onrender.com/exerciselogs',{
                method:'POST',
                headers:{'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({selectedExercise})
            })
            console.log(selectedExercise);
            const data=await response.json();
            console.log(data);
            navigate('/dashboard');
        }
        catch(err){
            console.log(err);
        }
        
        
    }
    return(
        <>
            <h1 style={{color:'#040952'}}>Welcome to exercise Tracking Page</h1>

            <div className="signcontainer">
                <form onSubmit={submitExercise}>

                    {selectedExercise.map((item, index) => (
                        <div className="eachLine" key={index}>
                            <OnlySelectOption
                                index={index}
                                exercise={item.exercise}
                                duration={item.duration}
                                updatedValue={updateExercise}
                                selectedExercise={selectedExercise}
                            />
                        </div>
                    ))}

                    <div className="button-group">
                        <button
                            type="button"
                            onClick={addExercise}
                        >
                            Add 
                        </button>

                        <button type="submit">
                            Submit All
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}


export default SelectExercise;
