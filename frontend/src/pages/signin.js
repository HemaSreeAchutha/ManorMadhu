import React, { useState } from "react";
import "./style.css";
import { useNavigate,Link } from "react-router-dom";
 
 
function Signin() {
    const navigate=useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log("sending data...");
        const response=await fetch("https://manormadhu.onrender.com/signin",{
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
            <div className="auth-page">
                <h1 className="auth-title">Sign in</h1>
                <div className="signcontainer">
                    <form onSubmit={handleSubmit}>
 
                        <div className="eachLine">
                            <label htmlFor="username">Username:</label>
                            <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="eachLine">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
 
                        <p>Don't have account? <Link to='/register'>Register</Link></p>
                        <button type="submit" >sign in</button>
                    </form>
                </div>
            </div>
        </>
    );
}
 
export default Signin;
 