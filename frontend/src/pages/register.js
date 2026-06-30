import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";


function Register(){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [age,setAge]=useState("");
    const [gender,setGender]=useState("");
    const [height,setHeight]=useState("");
    const [weight,setWeight]=useState("");
    const BMI=height>0?Number(weight)/(Number(height)*Number(height)):0;

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name,username,password,age,gender,height,weight,BMI})
        });
        const data=await response.json();
        alert(data.message);
        if(data.success){
            console.log(data);
            navigate('/signin');
        }
        
    }

    

    return(
        <>
            <h1>Register Here</h1>
            <div className="signcontainer">
                <br/><form onSubmit={handleSubmit}>
                    <div className="eachLine">
                        <label htmlFor="name">Name:</label><br/>
                        <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)}/><br/><br/>
                    </div>
                    
                    <div className="eachLine">
                        <label htmlFor="age">Age:</label><br/>
                        <input type="number" id="age" name="age" onChange={(e)=>setAge(e.target.value)}/>
                    </div>

                    <div className="eachLine">
                        <label htmlFor="gender" >Gender:</label>
                        <div className="genderLine">
                            <input type="radio" id="male" name="gender" value="male" onChange={(e)=>setGender(e.target.value)}/>
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" onChange={(e)=>setGender(e.target.value)}/>
                            <label htmlFor="female">Female</label><br/>
                        </div>
                    </div>

                    <div className="eachLine">
                        <label htmlFor="height">Height(cm):</label><br/>
                        <input type="number" name="height" id="height" onChange={(e)=>setHeight(e.target.value)}/><br/><br/>
                    </div>

                    <div className="eachLine">
                        <label htmlFor="weight">Weight(kg):</label><br/>
                        <input type="number" name="weight" id="weight" onChange={(e)=>setWeight(e.target.value)}/><br/><br/>
                    </div>

                    <div className="eachLine">
                        <label htmlFor="username">Username:</label><br/>
                        <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/><br/><br/>
                    </div>

                    <div className="eachLine">
                        <label htmlFor="password">Password:</label><br/>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
                    </div>

                    <button type="submit" >Register</button>
                </form>
            </div>
    
        </>
    );
}

export default Register;