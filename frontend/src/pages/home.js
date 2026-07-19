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
            <section className="home-hero">
                <div className="home-photo-banner">
                    <span className="home-badge home-badge-onphoto">Diabetes Care, Reimagined for India</span>
                    <h1 className="home-title home-title-onphoto">Welcome to <span className="home-title-accent-onphoto">ManorMadhu</span></h1>
                    <p className="home-subtitle home-subtitle-onphoto" style={{color:"white"}}>Your personal companion for diabetes-friendly nutrition and emotional wellness.</p>
                    <div className="home-tagline-group">
                        <p className="homepara homepara-onphoto">🍛 Track Diabetes Through Lifestyle & Emotions</p>
                        <p className="homepara homepara-onphoto">📊 Check your weekly report anytime</p>
                    </div>
                    <button onClick={GoToSignin} className="home-cta">Get Started</button>
                </div>
 
                <div className="home-hero-highlights">
                    <div className="home-highlight-card">
                        <span className="home-highlight-icon">🥗</span>
                        <h3>Food Tracking</h3>
                        <p>Log home food, packaged snacks & fruits, and see carbs and calories instantly.</p>
                    </div>
                    <div className="home-highlight-card">
                        <span className="home-highlight-icon">💛</span>
                        <h3>Emotion Insights</h3>
                        <p>Understand how stress, cravings, and mood connect to your sugar levels.</p>
                    </div>
                    <div className="home-highlight-card">
                        <span className="home-highlight-icon">📈</span>
                        <h3>Weekly Reports</h3>
                        <p>Clear, simple trends the whole family can read and act on.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Home;
 