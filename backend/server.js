require("dotenv").config();
const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');
const app=express();
const PORT=process.env.PORT || 5000;
const auth=require("./auth");
const jwt=require("jsonwebtoken");
const {testGemini}=require("./services/aiRecommendation.js");


app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
/*const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hema@1896",
  database: "diabetes_tracker"
});*/

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
})

let lastuser={};
//var user_id;
app.post('/signin',(req,res)=>{
    lastuser=req.body;
    const {username,password}=req.body;
    const query="select user_id,password from users where username=?";
    db.query(
        query,
        [username],
        (err,result)=>{
            if(err){
                return res.json({
                    success:false,
                    message:"Database Error"
                });
                console.log("failure");
            }
            
            if(result.length===0){
                return res.json({
                    success:false,
                    message:"Username not found"
                });
                console.log("failure");

            }
            const user_id=result[0].user_id;
            if(result[0].password===password){
                const token=jwt.sign(
                    {
                        id:user_id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:"1d"
                    }
                )
                res.json({
                    success:true,
                    message:"Login successful",
                    token
                });
                console.log("Successfull");
            }
            else{
                res.json({
                    success:false,
                    message:"password incorrect"
                });
                console.log("failure");
            }
            
        }
    )
    console.log(req.body);
    
    //res.send("Data Received");
});

app.get('/signin',(req,res)=>{
    res.json(lastuser);
});


lastregister={};
app.post('/register',(req,res)=>{
    lastregister=req.body;
    const {name,age,gender,username,password,height,weight,BMI}=req.body;
    console.log(req.body);
    const query="INSERT INTO users(name,username,password,age,gender,height,weight,BMI) values(?,?,?,?,?,?,?,?);"
    db.query(
        query,
        [name,username,password,age,gender,height,weight,BMI],
        (err,result)=>{
            if(err){
                console.log("failure")
                return res.send(err);
                
            }
            else{
                console.log("User registered");
                res.json({
                    success:true,
                    message:'data received',
                    register:req.body
                });
            }
        }
    )
    console.log(req.body);
    /*res.json({
        'message':'data received',
        'register':req.body
    });*/
});

app.get('/register',(req,res)=>{
    res.json(lastregister);
});

app.get('/foods',auth,(req,res)=>{
    const sql='SELECT * FROM foods';
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({
                error:err.message
            });
        }
        res.json(result);
    });
});

const packagedProduct="";
app.post('/foodlogs',auth,(req,res)=>{
    const curuser_id=req.user.id;
    const foodEntries=req.body.foodEntries;
    console.log(foodEntries);
    console.log(JSON.stringify(req.body,null,2));
    //const {food_id,foodType,quantity}=req.body.foodEntries;
    //const {food,foodType,quantity}=foodEntries;
    for (const entry of foodEntries){
        if(entry.foodType==="Packaged"){
        const query='insert into packaged_food_logs(user_id,product_id,quantity,carbs,calories) values(?,?,?,?,?)';
            db.query(query,
                [curuser_id,entry.product_id,entry.quantity,entry.carbs,entry.calories],
                (err,result)=>{
                    if(err){
                        console.log(err);
                    }
                }
            )   
        }
        else{
            const query='insert into food_logs(user_id,food_id,quantity) values (?,?,?)';
            db.query(query,
                [curuser_id,entry.food_id,entry.quantity],
                (err,result)=>{
                    if(err){
                        console.log(err.message);
                    }
                }
            )
        }
    }
    res.json("Successful");   
});

app.post('/exerciselogs',auth,(req,res)=>{
    const exerciseEntries=req.body.selectedExercise;
    console.log(exerciseEntries);
    for(const entry of exerciseEntries){
        const query='insert into exercise_logs(user_id,exercise_name,duration) values(?,?,?)';
        db.query(query,
            [req.user.id,entry.exercise,entry.duration],
            (err,result)=>{
                if(err){
                    console.log(err.message);
                }
                else{
                    console.log("success");
                }
            }
        );
    }
    res.json({exerciseEntries});
});

app.post('/emotion',auth,(req,res)=>{
    const {emotion}=req.body;
    console.log(req.body);
    const query='insert into emotion_logs(user_id,emotion_name) values(?,?)';
    db.query(query,
        [req.user.id,emotion],
        (err,result)=>{
            if(err){
                console.log(err);
                return res.json({
                    success:false,
                    message:err
            });
            }
            return res.json({
                success:true,
                message:"emotion saved",result
        });
        });
});

function queryDB(sql,params=[]){
    return new Promise((resolve,reject)=>{
        db.query(sql,
            params,(err,result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            }
        );
    });
    
}

/*app.get("/test-ai",auth, async (req, res) => {
    const user_id=req.user.id;
    const nutritionSql=`SELECT
        SUM(total_calories) AS total_calories,
        SUM(total_carbs) AS total_carbs
    FROM (
        SELECT
            SUM(fl.quantity * f.calories) AS total_calories,
            SUM(fl.quantity * f.carbs) AS total_carbs
        FROM food_logs fl
        JOIN foods f ON fl.food_id = f.id
        WHERE fl.user_id = ?
        AND DATE(fl.created_at) = CURDATE()

        UNION ALL

        SELECT
            SUM(pfl.quantity * pfl.calories) AS total_calories,
            SUM(pfl.quantity * pfl.carbs) AS total_carbs
        FROM packaged_food_logs pfl
        WHERE pfl.user_id = ?
        AND DATE(pfl.created_at) = CURDATE()
    ) AS combined;`;

    const sugarsql=`SELECT before_food,after_food FROM sugar_logs WHERE user_id=? AND DATE(created_at)=CURDATE()`;
    const sugarResult=await queryDB(sugarsql,[user_id]);
    const beforeMeal=Number(sugarResult[0]?.before_food)||0;
    const afterMeal=Number(sugarResult[0]?.after_food)||0;

    const emotionssql=`SELECT emotion_name FROM emotion_logs WHERE user_id=? AND DATE(emotion_date)=CURDATE()`;
    const emotions=await queryDB(emotionssql,[user_id]);
    const todayEmotions=emotions.map((item)=>item.emotion_name);
    console.log(todayEmotions);
    //const currentEmotion=emotions[0]?.emoti
    // 
    // on_name || "Neutral";
    const nutritionSummary=await queryDB(nutritionSql,[user_id,user_id]);
    const total_carbs=Number(nutritionSummary[0]?.total_carbs)||0;
    const total_calories=Number(nutritionSummary[0]?.total_calories)||0;

    const BMIResult=await queryDB('select BMI from users where user_id=?',[user_id]);
    const BMI=Number(BMIResult[0]?.BMI)||0;

    const exerciseResult=await queryDB(
        `select SUM(duration) as total_duration from exercise_logs where user_id=? and exercise_date=CURDATE()`,
        [user_id]
    );
    const exerciseDuration=Number(exerciseResult[0]?.total_duration)||0;
    const userData={
        BMI:BMI,
        beforeMeal:beforeMeal,
        afterMeal:afterMeal,
        total_calories:total_calories,
        total_carbs:total_carbs,
        exerciseDuration:exerciseDuration,
        emotions:todayEmotions
    }
  try {
    const reply = await testGemini(userData);
    console.log(reply);
    const recommendation = JSON.parse(reply);

    res.json({recommendation,userData});
  } catch (error) {
    console.error(error);
    res.status(500).send("Error calling Gemini");
  }
});*/

app.get('/recommendation',auth,async (req,res)=>{
     //console.log("Entered /recommendation route");
    const user_id=req.user.id;
    console.log("user_id:", user_id);
    const nutritionSql=`SELECT
        SUM(total_calories) AS total_calories,
        SUM(total_carbs) AS total_carbs
    FROM (
        SELECT
            SUM(fl.quantity * f.calories) AS total_calories,
            SUM(fl.quantity * f.carbs) AS total_carbs
        FROM food_logs fl
        JOIN foods f ON fl.food_id = f.id
        WHERE fl.user_id = ?
        AND DATE(fl.created_at) = CURDATE()

        UNION ALL

        SELECT
            SUM(pfl.quantity * pfl.calories) AS total_calories,
            SUM(pfl.quantity * pfl.carbs) AS total_carbs
        FROM packaged_food_logs pfl
        WHERE pfl.user_id = ?
        AND DATE(pfl.created_at) = CURDATE()
    ) AS combined;`;

    const sugarsql=`SELECT before_food,after_food FROM sugar_logs WHERE user_id=? AND DATE(created_at)=CURDATE()`;
    const sugarResult=await queryDB(sugarsql,[user_id]);
    console.log("Sugar Result:", sugarResult);
    const beforeMeal=Number(sugarResult[0]?.before_food)||0;
    const afterMeal=Number(sugarResult[0]?.after_food)||0;

    const emotionssql=`SELECT emotion_name FROM emotion_logs WHERE user_id=? AND DATE(emotion_date)=CURDATE()`;
    const emotions=await queryDB(emotionssql,[user_id]);
    console.log("Emotions Result:", emotions);
    const todayEmotions=emotions.map((item)=>item.emotion_name);
    console.log(todayEmotions);
    //const currentEmotion=emotions[0]?.emoti
    // 
    // on_name || "Neutral";
    const nutritionSummary=await queryDB(nutritionSql,[user_id,user_id]);
    console.log("Nutrition Summary:", nutritionSummary);
    const total_carbs=Number(nutritionSummary[0]?.total_carbs)||0;
    const total_calories=Number(nutritionSummary[0]?.total_calories)||0;

    const BMIResult=await queryDB('select BMI from users where user_id=?',[user_id]);
    console.log("BMI Result:", BMIResult);
    const BMI=Number(BMIResult[0]?.BMI)||0;

    const exerciseResult=await queryDB(
        `SELECT SUM(duration) AS total_duration
        FROM exercise_logs
        WHERE user_id = ?
        AND DATE(exercise_date) = CURDATE()`,
        [user_id]
    );
    console.log("Exercise Result:", exerciseResult);
    const exerciseDuration=Number(exerciseResult[0]?.total_duration)||0;

    const userData={
        BMI:BMI,
        beforeMeal:beforeMeal,
        afterMeal:afterMeal,
        total_calories:total_calories,
        total_carbs:total_carbs,
        exerciseDuration:exerciseDuration,
        emotions:todayEmotions
    }
    let recommendation=null;
    try {
    console.log("testGemini is calling...")
    const reply = await testGemini(userData);
    console.log("testGemini response:");
    console.log(reply);
    recommendation = JSON.parse(reply);

    //res.json({recommendation,userData});
  } 
  catch (err) {
    console.error("Gemini Error:", err);

    recommendation = {
        diet: "AI recommendation is currently unavailable.",
        exercise: "Walk for at least 30 minutes daily.",
        foodsToAvoid: "Avoid sugary drinks and processed foods.",
        lifestyle: "Sleep 7-8 hours and stay hydrated.",
        motivation: "Keep tracking your health every day."
    };
}

/*res.json({
    ...result,
    recommendation
});*/

    const recommendations=[];

    const status={BMIStatus:"",carbsStatus:"",calorieStatus:"",exerciseStatus:""};
    if(total_carbs<130){
        status.carbsStatus="Low";
        recommendations.push("Good carbohydrate control.");
        recommendations.push("Continue balanced meals.");
    }
    else if(total_carbs<=250){
        status.carbsStatus="Moderate";
        recommendations.push("Acceptable range.");
        recommendations.push("Prefer whole grains and vegetables.");
    }
    else{
        status.carbsStatus="High";
        recommendations.push("High carbohydrate intake detected.");
        recommendations.push("Reduce sweets, soft drinks and refined rice.");
    }

    
    if(total_calories<1500){
        status.calorieStatus="Low";
        recommendations.push("Ensure adequate nutrition.");
        recommendations.push("Do not skip meals.");
    }
    else if(total_calories<=2500){
        status.calorieStatus="Moderate";
        recommendations.push("Calorie intake within healthy range.");
        recommendations.push("Maintain this range only");
    }
    else{
        status.calorieStatus="High";
        recommendations.push("Reduce high-calorie snacks and fried foods.");
        recommendations.push("Increase physical activity.");
    }

    
    if(exerciseDuration<30){
        status.exerciseStatus="Low";
        recommendations.push("Increase physical activity.");
        recommendations.push("Aim for at least 30 minutes of exercise daily.");
    }
    else{
        status.exerciseStatus="Good";
    }
    
    if(BMI<18.5){
        status.BMIStatus="Underweight";
        recommendations.push("Increase healthy calorie intake.");
        recommendations.push("Eat more protein.");
        recommendations.push("Consult a dietitian.");

    }
    else if(BMI<25){
        status.BMIStatus="Normal";
        recommendations.push("Maintain current weight.");
        recommendations.push("Continue regular exercise.");
    }
    else if(BMI<30){
        status.BMIStatus="Overweight";
        recommendations.push("Reduce sugary foods.");
        recommendations.push("Walk 30-45 minutes daily.");
        recommendations.push("Aim for gradual weight loss.");
    }
    else{
        status.BMIStatus="Obese";
        recommendations.push("Strong focus on weight reduction.");
        recommendations.push("Monitor blood sugar regularly.");
        recommendations.push("Consult a healthcare professional.");
    }
    //emotions
    if(todayEmotions.includes("Happy")){
        recommendations.push("Keep up the positive mood! Continue following your balanced meal plan and stay active");
    }
    if(todayEmotions.includes("Calm")){
        recommendations.push("Maintain your peaceful state with regular meals, adequate hydration, and light physical activity.");
    }
    if(todayEmotions.includes("Motivated")){
        recommendations.push("Great job staying motivated! Use this energy to plan healthy meals and achieve your fitness goals.");
    }
    if(todayEmotions.includes("Stressed")){
        recommendations.push("Stress can affect blood sugar levels. Try deep breathing, take a short walk, and avoid stress eating.");
    }
    if(todayEmotions.includes("CravingSugar")){
        recommendations.push("Choose healthier alternatives like fruits, yogurt, or nuts instead of sugary snacks.");
    }
    if(todayEmotions.includes("Angry")){
        recommendations.push("Take a few moments to relax before eating. Avoid emotional eating and focus on balanced meals.");
    }
    if(todayEmotions.includes("Tired")){
        recommendations.push("Low energy may be improved with proper sleep and nutritious foods rich in protein and fiber.");
    }
    if(todayEmotions.includes("Anxious")){
        recommendations.push("Stay hydrated and eat meals on time. Relaxation techniques and gentle exercise may help reduce anxiety.");
    }
    if(todayEmotions.includes("Guilty")){
        recommendations.push("Don't be too hard on yourself. One unhealthy meal won't ruin your progress. Get back to your healthy routine.");
    }
    if(todayEmotions.includes("Energetic")){
        recommendations.push("Use your energy wisely! Engage in physical activity and continue making healthy food choices.");
    }
                                            
        recommendations.push("Drink 2.5-3 litres of water daily");
        console.log("Recommendations:",recommendations);
    res.json({
        BMI,total_carbs,total_calories,exerciseDuration,status,recommendations,recommendation,userData  
    });
    /*db.query(sql,[user_id,user_id],
        (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    });*/
});
    

app.get('/weeklyreport',auth,async (req,res)=>{
    const user_id=req.user.id;
    const sql=`Select day,
        SUM(total_carbs) as total_carbs,
        SUm(total_calories) as total_calories
        from
        (select
            DATE_FORMAT(fl.created_at,'%d-%m-%Y') AS day,
            SUM(fl.quantity*f.carbs) as total_carbs,
            SUM(fl.quantity*f.calories) as total_calories
            from food_logs as fl 
            join foods as f on fl.food_id=f.id
            where fl.user_id=?
            and fl.created_at >= DATE_SUB(CURDATE(),INTERVAL 7 DAY)
            GROUP BY DATE_FORMAT(fl.created_at,'%d-%m-%Y')
            
            union all

            select DATE_FORMAT(pfl.created_at,'%d-%m-%Y') AS day,
            SUM(pfl.quantity*pfl.carbs) As total_carbs,
            SUM(pfl.quantity*pfl.calories) AS total_calories
            from packaged_food_logs as pfl
            where pfl.user_id=?
            and pfl.created_at >= DATE_SUB(CURDATE(),INTERVAL 7 DAY)
            GROUP BY DATE_FORMAT(pfl.created_at,'%d-%m-%Y'))           
            as combined
            group by day
            order by STR_TO_DATE(day,'%d-%m-%Y');`;

    const weekly_report=await queryDB(sql,[user_id,user_id]);
    let total_carbs=0,total_calories=0;
    
    weekly_report.forEach((item)=>{
        total_carbs += Number(item.total_carbs || 0);
        total_calories += Number(item.total_calories || 0);
    });

    const days=weekly_report.length || 1;
    const avgCarbs=total_carbs/days;
    const avgCalories=total_calories/days;

    const total_exercise_query=`select SUM(duration) as total_duration
                                    from exercise_logs
                                    where user_id=? 
                                    and exercise_date >= DATE_SUB(CURDATE(),INTERVAL 7 DAY)`
    const total_exercise=await queryDB(total_exercise_query,[user_id]);
    const exerciseMinutes = Number(total_exercise[0]?.total_duration) || 0;

    const recommendations=[];
    const status={carbsStatus:"",calorieStatus:"",exerciseStatus:""};
    if(avgCarbs<=250){
        status.carbsStatus="GOOD";
        recommendations.push("Great job maintaining carbohydrate intake within recommended limits.");
    }
    else{
        status.carbsStatus="HIGH";
        recommendations.push("Your carbohydrate intake is high. Reduce refined carbohydrates such as biscuits, chips, sweets, and sugary drinks.");
    }

    if(avgCalories<1200){
        status.calorieStatus="LOW";
        recommendations.push("Your calorie intake appears low. Ensure you're consuming balanced meals throughout the day.");
    }
    else if(avgCalories<2500){
        status.calorieStatus="GOOD";
        recommendations.push("Maintain the same diet");
    }
    else{
        status.calorieStatus="HIGH";
        recommendations.push("Your calorie intake is high. Reduce portion sizes and avoid excess fried or sugary foods.");
    }

    if(exerciseMinutes<=150){
        status.exerciseStatus="LOW";
        recommendations.push("Aim for at least 150 minutes of moderate exercise per week.");
    }
    else if(exerciseMinutes<=250){
        status.exerciseStatus="GOOD";
        recommendations.push("Excellent! You met the recommended weekly exercise target.");
    }
    else{
        status.exerciseStatus="HIGH"
        recommendations.push(`Reduce refined carbs and sugary foods.
            Choose whole grains over processed grains.
            Eat more vegetables and salads.
            Avoid frequent packaged snacks.
            Prefer low-GI fruits.
            Spread carbs evenly across meals.
            Monitor blood sugar regularly.
            Exercise at least 30 minutes daily.`);
    }

    res.json({weekly_report,avgCarbs,avgCalories,total_exercise:exerciseMinutes,status,recommendations});

    /*db.query(sql,[user_id,user_id],
        (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result);
        }
    });*/
});

app.get("/api/search-food",auth, async (req, res) => {
    
    try {

        const search = encodeURIComponent(req.query.food);

        const response = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${search}&json=1`
        );

        const text = await response.text();

        console.log("Status:", response.status);

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Open Food Facts unavailable"
            });
        }

        data = JSON.parse(text);

        res.json(data.products || []);

    } catch(err) {

        console.log(err);

        res.status(500).json([]);
    }
});

app.get('/packaged-brands',auth,(req,res)=>{
    const sql='select * from packaged_brands';
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result);//array of objects
    });
});

app.post('/sugar-level-page',auth,(req,res)=>{
    const beforeMeal=Number(req.body.beforeMeal);
    const afterMeal=Number(req.body.afterMeal);
    const {before,after}=req.body;
    const sql='insert into sugar_logs(user_id,before_food,after_food) values (?,?,?)';
    const recommendations=[];
    const status={beforeStatus:"",afterStatus:""};
    
    if(beforeMeal<70 ){
        status.beforeStatus="Low";
        recommendations.push("Consume 15-20 g of fast-acting carbohydrates (e.g., glucose tablets or fruit juice), recheck after 15 minutes, and consider seeking medical advice if symptoms persist.");
    }
    else if(beforeMeal >= 70 && beforeMeal <= 99 ){
        status.beforeStatus="Normal";
        recommendations.push("Continue your balanced diet and regular physical activity.");
    } 
    else if(beforeMeal >= 100 && beforeMeal <= 125 ){
        status.beforeStatus="Above Normal";
        recommendations.push("Monitor your diet, reduce refined carbohydrates, and include more fiber-rich foods.");
    }
    else if(beforeMeal >= 126 && beforeMeal <= 180 ){
        status.beforeStatus="High";
        recommendations.push("Keep track of carbohydrate intake, stay hydrated, and follow your healthcare provider's recommendations.");
    }
    else if(beforeMeal >= 181 && beforeMeal <= 250 ){
        status.beforeStatus="Very High";
        recommendations.push("Limit high-sugar foods, monitor your blood sugar closely, and consult your healthcare provider if readings remain elevated.");
    }
    else if(beforeMeal > 250 ){
        status.beforeStatus="Dangerously High";
        recommendations.push("Seek medical advice promptly, especially if you have symptoms such as excessive thirst, frequent urination, or nausea.");
    }

    if(afterMeal<99 ){
        status.afterStatus="Low";
        recommendations.push("Treat low blood sugar with 15–20 g of fast-acting carbohydrates and recheck after 15 minutes.");
    }
    else if(afterMeal >= 100 && afterMeal <= 140 ){
        status.afterStatus="Normal";
        recommendations.push("Excellent control. Continue your current healthy eating and activity habits.");
    }
    else if(afterMeal >= 141 && afterMeal <= 199 ){
        status.afterStatus="Above Normal";
        recommendations.push("Reduce portion sizes of high-carbohydrate foods and include more vegetables and lean protein.");
    }
    else if(afterMeal >= 200 && afterMeal <= 250 ){
        status.afterStatus="High";
        recommendations.push("Review your meal choices, increase physical activity if appropriate, and monitor future readings.");
    }
    else if(afterMeal >= 251 && afterMeal <= 300 ){
        status.afterStatus="Very High";
        recommendations.push("Avoid sugary foods and drinks, drink water, and monitor your blood sugar more frequently.");
    }
    else if(afterMeal > 300 ){
        status.afterStatus="Dangerously High";
        recommendations.push("Contact your healthcare provider promptly, particularly if high readings continue or you feel unwell.");
    }

    db.query(sql,
        [req.user.id,before,after],
        (err,result)=>{
            if(err){
                console.log(err);
                res.json({
                    success:false,
                    err
                });
            }
            else{
                res.json({
                    success:true,
                    result,
                    status,
                    recommendations
                });
            }
        }
    )
});
app.get('/profile',auth,(req,res)=>{
    const sql='select * from users where user_id=?';
    db.query(sql,[req.user.id],(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(result[0] || {});
    });
});
app.post('/editprofile',auth,(req,res)=>{
    const {name,age,gender,height,weight}=req.body.userData;
    const sql='update users set name=?,age=?,gender=?,height=?,weight=?,BMI=? where user_id=?';
    const BMI=Number(weight)/((Number(height)/100)**2);
    queryDB(sql,[name,age,gender,height,weight,BMI,req.user.id],(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                success:false,
                err
            });
        }
        else{
            res.json({
                success:true,
                result
            });
        }
    });
});
app.listen(PORT,()=>{
    console.log(`app running at http://localhost:${PORT}`);
});
