import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const FoodDetails = (props) => {

    const {id}=useParams();
    const [meal,setmeal]=useState([]);
    const [val,setval]=useState(0)

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
        <div className="w-1/3">
            <img src={meal.strMealThumb} alt="" className=""/>
            <div>{meal.strMeal}</div>
            <div className="flex gap-5">
                <button className="bg-red-700 text-2xl font-semibold pl-2 pr-2 pt-1 pb-1 w-10 text-white rounded-sm" onClick={()=>setval(val+1)}>+</button>
                <div className="p-2 text-xl font-semibold">{val}</div>
                <button className="bg-red-700 text-2xl font-semibold pl-2 pr-2 pt-1 pb-1 w-10 text-white rounded-sm" onClick={()=>setval(val-1)}>-</button>
            </div>

        </div>
        <div className="w-2/3 pl-7"> 
            <h1 className="font-medium text-2xl border-l-4 border-red-600 pl-3">Instructions:</h1 >
            <div className="font-serif text-pretty mt-4 leading-7 text-lg">{meal.strInstructions}</div>
            <div className=" mt-8 text-lg font-semibold">
                <div className="border-l-4 pl-3 border-red-600 mb-5"><span className="pr-2">ORIGIN</span>:
                <span className="pl-2">{meal.strArea}</span>
                </div>
                <div className="border-l-4 pl-3 border-red-600 mb-3"><span className="pr-2">CATEGORY</span>:
                <span className="pl-2 ">{meal.strCategory}</span></div>
            </div>
            <Link to={meal.strYoutube}>Watch recipe</Link>
        </div>
    </div>
    </>

  )
};

export default FoodDetails;
