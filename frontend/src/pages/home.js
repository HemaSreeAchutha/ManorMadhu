
import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";



function Home(){
    const navigate=useNavigate();
    function GoToSignin() {
            navigate('./signin');
        }
    return(
        <>
            <section className="homecontainer">
                <h1 style={{fontSize: '50px'}}>Welcome to ManorMadhu</h1>
                <h1 className="h1Style">Your personal companion for diabetes-friendly nutrition and emotional wellness.</h1>
                <p className="homepara">Track Diabetes Through Lifestyle & Emotions</p>
                <p className="homepara">You can check your weekly report</p>
                <button onClick={GoToSignin} style={{height:'80px',width:'160px',cursor:'pointer'}}>Get Started</button><br/><br/><br/>


            </section>
        </>
    );
}

export default Home;