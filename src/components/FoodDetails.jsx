import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router";

const FoodDetails = (props) => {

    const {id}=useParams();
    const [meal,setmeal]=useState([]);

    useEffect(()=>{
        const fetchmeal = async ()=>{
            try {
                const response= await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                setmeal(response.data.meals[0])
            } catch (error) {
                console.error("Error fetchind details",error)
            }
        };
        fetchmeal();
    },[id])

  return (
    <>
    <div className="p-5">
    <div className="text-4xl font-semibold border-l-8 border-red-600 pl-4">{meal.strMeal}</div>
    </div>

    <div className=" flex p-5">
        <div className="w-2/3">
            <img src={meal.strMealThumb} alt="" className="h-3/4"/>
            <div>{meal.strMeal}</div>
        </div>
        <div className="1/3"> 
        
        </div>
    </div>
    </>

  )
};

export default FoodDetails;
