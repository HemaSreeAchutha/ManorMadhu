import "./style.css";
 
function About(){
    //✉️
    return(
        <>
            <div className="about-container">
                <div className="glass-header">
                    <h1>About ManorMadhu</h1>
                    <p>ManorMadhu is a web application designed to help users monitor their daily food intake and make informed dietary choices. The application provides nutritional information for homemade and packaged foods, allowing users to track their carbohydrate and calorie intake. Based on the foods consumed, the system offers personalized dietary recommendations to support healthier eating habits.</p>
                </div>
 
                <div className="glass-card">
                    <h2>Our Objective</h2>
                    <ul>
                        <li>Help users monitor their daily food consumption.</li>
                        <li>Increase awareness of carbohydrate and calorie intake.</li>
                        <li>Encourage healthier food choices through personalized recommendations.</li>
                        <li>Support better diabetes management by providing nutritional insights</li>
                        <li>Simplify food tracking using an easy-to-use interface.</li>
                    </ul>
                </div>
 
                <div className="glass-card">
                    <h2>Key Features</h2>
                    <div className="feature-grid">
                        <div className="feature-item">
                            <h3>🍛 Food Tracking</h3>
                            <ul>
                                <li>Log homemade and packaged foods.</li>
                                <li>Add multiple food items in a single meal.</li>
                                <li>Enter quantity consumed for each food item.</li>
                            </ul>
                        </div>
                        <div className="feature-item">
                            <h3>📊 Nutritional Information</h3>
                            <ul>
                                <li>View calories and carbohydrates for selected foods.</li>
                                <li>Access serving size information.</li>
                                <li>Search nutritional information for packaged foods.</li>
                            </ul>
                        </div>
                        <div className="feature-item">
                            <h3>💡 Personalized Recommendations</h3>
                            <ul>
                                <li>Receive food recommendations based on daily intake.</li>
                                <li>Identify healthier alternatives.</li>
                                <li>Get guidance for maintaining a balanced diet.</li>
                            </ul>
                        </div>
                        <div className="feature-item">
                            <h3>🔒 Secure User Accounts</h3>
                            <ul>
                                <li>User registration and login.</li>
                                <li>Secure authentication using JWT</li>
                                <li>Personal food history stored separately for each user.</li>
                            </ul>
                        </div>
                    </div>
                </div>
 
                <div className="glass-card">
                    <h2>Technologies Used</h2>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React.js</li>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                            </ul>
                        </div>
                        <div className="tech-item">
                            <h3>Backend</h3>
                            <ul>
                                <li>Node.js</li>
                                <li>Express.js</li>
                            </ul>
                        </div>
                        <div className="tech-item">
                            <h3>Database</h3>
                            <ul>
                                <li>MySQL</li>
                            </ul>
                        </div>
                        <div className="tech-item">
                            <h3>Authentication</h3>
                            <ul>
                                <li>JWT (JSON Web Tokens)</li>
                            </ul>
                        </div>
                        <div className="externaltech-item">
                            <h3>External API</h3>
                            <ul>
                                <li>Open Food Facts API (for packaged food information)</li>
                            </ul>
                        </div>
                    </div>
                </div>
 
                <div className="glass-card">
                    <h2>Who Can Use This Application?</h2>
                    
                    <ul>
                        <li>Individuals managing diabetes.</li>
                        <li>People who want to monitor their daily food intake along with emotions and physical activity.</li>
                        <li>Users interested in understanding the nutritional value of foods.</li>
                        <li>Students and researchers exploring nutrition-related applications.</li>
                    </ul>
                </div>
 
                <div className="glass-card important-note">
                    <h2>Important Note</h2>
                    <p>This application is intended to provide general nutritional information and dietary guidance. It is not a substitute for professional medical advice, diagnosis, or treatment. Users should consult qualified healthcare professionals for medical decisions related to diabetes management.</p>
                </div>
 
                <div className="team-section">
                    <span className="home-badge">JNTUACEA College Project</span>
                    <h2 className="team-heading">Meet the Team</h2>
 
                    <div className="team-grid">
                        <div className="mentor-card">
                            <span className="mentor-badge">Project Guide</span>
                            <div className="mentor-avatar">👤</div>
                            <h3 className="mentor-name">Dr. A. P. Siva Kumar</h3>
                            <p className="mentor-title">Professor, Dept. of Computer Science and Engineering</p>
                            <p className="mentor-institution">Jawaharlal Nehru Technological University Anantapur (JNTUA)</p>
                        </div>
 
                        <div className="students-card">
                            <h3 className="students-card-title">Developed By</h3>
                            <div className="student-row">
                                <div className="student-avatar">VL</div>
                                <div className="student-info">
                                    <p className="student-name">Vanam Likhitha Sai</p>
                                    <p className="student-roll">24001A0531</p>
                                </div>
                            </div>
                            <div className="student-row">
                                <div className="student-avatar">AH</div>
                                <div className="student-info">
                                    <p className="student-name">Achutha Hema Sree</p>
                                    <p className="student-roll">24001A0557</p>
                                </div>
                            </div>
                            <div className="student-row">
                                <div className="student-avatar">RS</div>
                                <div className="student-info">
                                    <p className="student-name">Reddy Sai Hasini</p>
                                    <p className="student-roll">24001A0546</p>
                                </div>
                            </div>
                            <p className="team-email" style={{fontSize: '20px'}}>✉ manormadhu.online@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
}
export default About;
 