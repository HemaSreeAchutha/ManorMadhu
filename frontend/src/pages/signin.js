import React, { useState } from "react";
import "./style.css";
import { useNavigate,Link } from "react-router-dom";
//import { response } from "express";
//import { application, json } from "express";



function Signin() {
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("sending data...");
        const response=await fetch("http://localhost:5000/signin",{
            method: "POST" ,
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
        });
        const data=await response.json();
        if(response.ok){
            localStorage.setItem("token",data.token);
        }
        alert(data.message);
        if(data.success){
            
            navigate("/dashboard");
        }
        console.log(data);
    };

    return(
        <>
            <h1>Sign in</h1>
            <div className="signcontainer">
                
                <br/>
                <form onSubmit={handleSubmit}>

                    <div className="eachLine">
                        <label htmlFor="username" style={{marginLeft:'20px'}}>Username:</label><br/>
                        <input type="text" name="username" id="username" style={{marginLeft:'20px'}} onChange={(e)=>setUsername(e.target.value)}/><br/><br/>
                    </div>
                    <div className="eachLine">
                        <label htmlFor="password">Password:</label><br/>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    <p>Don't have account? <Link to='/register'>Register</Link></p>
                    <button type="submit" >sign in</button>
                </form>
            </div>
        </>
    );
}

export default Signin;