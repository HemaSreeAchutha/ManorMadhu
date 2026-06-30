import React, { useState,useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function FoodTracking(){
    const navigate=useNavigate();
    //const [foodType,setFoodType]=useState("");
    const [foods,setFoods]=useState([]);
    const [foodEntries,setFoodEntries]=useState([{food_id:"",foodType:"",quantity:"",brand:"",product:"",carbs:"",calories:""}]);
    //const [selectedFood,setSelectedFood]=useState(null);
    const [brands,setBrands]=useState([]);
    const [products,setProducts]=useState([]);
    //const [selectedProduct,setSelectedProduct]=useState({});

    useEffect(()=>{
        getFoods();
    },[]);

    useEffect(()=>{
        loadBrands();
    },[]);

    async function loadBrands() {
        const token=localStorage.getItem("token");
        const response=await fetch('http://localhost:5000/packaged-brands',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
        const data=await response.json();
        setBrands(data);
    }

     /*useEffect(() => {
            packagedFoods();
    },[]);*/
    
    function updateFoodEntry(index,field,value){
        const updated=[...foodEntries];
        updated[index][field]=value;
        setFoodEntries(updated);
    }

    async function getFoods() {
        try{
            const token=localStorage.getItem("token");
            const response=await fetch("http://localhost:5000/foods",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await response.json();
            console.log(data);
            setFoods(data);
            
        }
        catch(err){
            console.log(err);
        }
    }

    async function getFoodLogs() {
        const validFood=foodEntries.filter((item)=>item.food_id && item.foodType && item.quantity)
        if(validFood.length===0){
            alert("Please complete selecting food entries");
            return false;
            
        }
        console.log(products);
        try{
            const token=localStorage.getItem("token");
            const response=await fetch("http://localhost:5000/foodlogs",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify({foodEntries})
            });
            const data=await response.json();
            console.log(data);
            return true;  
        }
        catch(err){
            console.log(err);
        }
    }

    

   

    async function goToDashboard(e){
        e.preventDefault();
        console.log(foodEntries);
       
        const success=await getFoodLogs();
       
        if(success){
            navigate('/recommendation');
        }
        
    }

    function addFoodHandle(){
        setFoodEntries([...foodEntries,{food_id:"",foodType:"",quantity:"",brand:"",product:"",product_id:"",carbs:"",calories:""}]);
        
    }

    async function getProducts(brand){
        try{
            const token=localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/search-food?food=${brand}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            const data=await response.json();
            console.log(data[0]);
            if(Array.isArray(data)){
                setProducts(data);
                
            }
            else{
                setProducts([]);
            }

        }
        catch(err){
            console.log(err);
            setProducts([]);
        }
    }
    
    //fruit-java plum
    const addFoodUi=(
        <>
               
                <div id="homemadeSection1">
                
                {
                    
                    foodEntries.map((entry,index)=>{
                        const presentFood = foods.find(item => item.id === Number(entry.food_id));
                        const filteredFoods=foods.filter(item=>item.food_type===entry.foodType);
                        console.log("Selected:", entry.food_id);
                        console.log("Found:", presentFood);
                         return <div className="food-row" key={index}>
                            
                            <label htmlFor="foodType">Choose Food Type</label>
                            <select id={`foodType-${index}`} value={entry.foodType} style={{width: '250px'}} onChange={(e)=>updateFoodEntry(index,"foodType",e.target.value)}>
                                <option value="">-- Select --</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Packaged">Packaged Food</option>
                                <option value="Fruit">Fruits</option>
                                <option value="Curry">Curry</option>
                                <option value="Grain">Rice and Grains</option>
                                <option value="Dairy">Dairy Products</option>
                                <option value="Snacks">Snacks and Fastfood</option>
                                <option value="Beverage">Beverages</option>
                            </select>

                            {
                                entry.foodType==="Packaged"?(
                                    <>
                                        <select value={entry.brand || ""} onChange={(e)=>{
                                            getProducts(e.target.value);
                                            updateFoodEntry(index,"brand",e.target.value);
                                            updateFoodEntry(index,"product","")
                                            }}>
                                            <option value="">--Select Brand--</option>
                                            {
                                                brands.map((brand)=>
                                                    <option key={brand.id} value={brand.brand_name}>{brand.brand_name}</option>
                                                )
                                            }
                                        </select>
                                        <select value={entry.product_id||""} onChange={(e)=>{
                                            updateFoodEntry(index,"product",e.target.value);
                                            updateFoodEntry(index,"product_id",e.target.value);
                                            const selected=products.find(
                                                item => String(item._id) === e.target.value
                                            );
                                            console.log(selected);
                                            if(selected){
                                                updateFoodEntry(index,"carbs",selected.nutriments?.carbohydrates_100g || 0);
                                                updateFoodEntry(index,"calories",selected.nutriments?.["energy-kcal_100g"] || 0);
                                            }
                                            
                                            }}>
                                            <option value="">--Select Product--</option>
                                            {
                                                products.map((product)=>
                                                    <option value={product._id} key={product._id}>{product.product_name}</option>
                                                )
                                            }
                                            
                                        </select>

                                    </>
                                ):(
                                    <select value={entry.food_id} id={`homemadeFood-${index}`} style={{width: '250px'}} onChange={(e)=>updateFoodEntry(index,"food_id",e.target.value)}>
                                    <option value="">-- Choose Food --</option>
                                    {
                                        filteredFoods.map((item,index)=>
                                            
                                                <option key={item.id} value={item.id}>{item.food_name}</option>
                                        )
                                    }
                                    
                                    </select>
                                )
                            }

                           <input className="Foodquantity-box" id={`quantity-${index}`} name="quantity" value={entry.quantity} type="text" placeholder={presentFood? `Quantity (${presentFood.serving_size})`: "Enter Quantity"} onChange={(e)=>updateFoodEntry(index,"quantity",e.target.value)}/>
                    
                        </div>
                        
    })
                }
                  </div>  
            
            </>
    )
    
    return(
        <>
            <div className="container">

            <h1>Food Tracker</h1>
            {addFoodUi}
            
            <form >
                <div className="foodButtons">
                    <button type="button" onClick={addFoodHandle}>Add</button>
                    <button type="submit" onClick={goToDashboard}>Submit</button>
                </div>
            </form>
            </div>
        </>
    );
}

export default FoodTracking;