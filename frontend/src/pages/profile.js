import "./style.css";
import {useState,useEffect} from "react";
 
function Profile({closeProfile}) {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    async function fetchProfileData() {
        try {
            const token = localStorage.getItem("token");    
            const response = await fetch('https://manormadhu.onrender.com/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userData = await response.json();
            setUserData(userData);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }
    
    async function updateProfile() {
        try {
            const token=localStorage.getItem("token");
            const response=await fetch('https://manormadhu.onrender.com/editprofile',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({userData})
            });
            const result = await response.json();
            console.log(result);
        }
        catch(err){
            console.log(err);
        }
    }
 
    useEffect(() => {
        fetchProfileData();
    }, []);
 
    async function saveProfile() {
        await updateProfile();
        setIsEditing(false);
        closeProfile(); 
    }
 
    return (
        <div>
            {isEditing ? <div className="profile-sidebar active">
                            <button className="close-btn" onClick={closeProfile}>
                                ✖
                            </button>
                            <h2>Edit Profile</h2>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" placeholder="Name" value={userData.name || ""} onChange={(e) => setUserData({...userData, name: e.target.value})} />
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" placeholder="Age" value={userData.age || ""} onChange={(e) => setUserData({...userData, age: e.target.value})} />
                            <label htmlFor="gender">Gender:</label>
                            <input type="text" id="gender" placeholder="Gender" value={userData.gender || ""} onChange={(e) => setUserData({...userData, gender: e.target.value})} />
                            <label htmlFor="height">Height (cm):</label>
                            <input type="number" id="height" placeholder="Height" value={userData.height || ""} onChange={(e) => setUserData({...userData, height: e.target.value})} />
                            <label htmlFor="weight">Weight (kg):</label>
                            <input type="number" id="weight" placeholder="Weight" value={userData.weight || ""} onChange={(e) => setUserData({...userData, weight: e.target.value})} />
                            <button className="profile-option" onClick={saveProfile}>
                                Save Changes
                            </button>
                        </div>
                : <div className={"profile-sidebar active"}>
                    <button
                        className="close-btn"
                        onClick={closeProfile}
                    >
                        ✖
                    </button>
 
                    <h2>My Profile</h2>
 
                    <div className="profile-image">
                        👤
                    </div>
 
                    <div className="info">
                        <p><strong>Name:</strong> {userData.name || 'N/A'}</p>
                        <p><strong>Age:</strong> {userData.age || 'N/A'}</p>
                        <p><strong>Gender:</strong> {userData.gender || 'N/A'}</p>
                        <p><strong>Height:</strong> {userData.height || 'N/A'} cm</p>
                        <p><strong>Weight:</strong> {userData.weight || 'N/A'} kg</p>
                    </div>
 
                    <button className="profile-option" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
 
                    <button className="profile-option logout">
                        Logout
                    </button>
 
                </div>
            }
        </div>        
    );
}
 
export default Profile;
 