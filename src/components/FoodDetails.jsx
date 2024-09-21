import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import Loader from "./Loader";


const FoodDetails = () => {

  const verifyPayment = async () =>{
    try {
      let res = await axios.post("http://localhost:8000/verify",{
        orderId:orderId
      })
      if(res && res.data ){
        alert("payment verified")
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  let cashfree;
  let initialisedSDK = async function () {
    cashfree = await load({
      mode:"sandbox", 
    })
  }

  initialisedSDK();
  const [orderId,setorderId]=useState("");

  const getSessionId = async()=>{
    try{
      let res = await axios.get("http://localhost:8000/payment");

      if(res.data && res.data.payment_session_id){
        console.log(res.data); 
        setorderId(res.data.order_id)
        return res.data.payment_session_id
      }


    } catch(error){
      console.log("payment error h",error);
    }
  }

  const handleClick = async (e)=>{
    e.preventDefault();
    try {
      
      let sessionId = await getSessionId();
      let checkoutOptions = {
        paymentSessionId:sessionId,
        redirectTarget:"_modal",
      }

      cashfree.checkout(checkoutOptions).then((res)=>{
        console.log('payment initiated');
        verifyPayment(orderId);
      })

    } catch (error) {
      console.log("there is payment error");
      
    }

  }

  const { id } = useParams(); 
  const [data, setdata] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/meal/${id}`);
        setdata(response.data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details", error);
      }
    };

    fetchMeal();
  }, [id]);

  if (!data) {
    return <div className=" flex justify-center items-center  min-h-screen"><Loader /></div>;
  }

  return (
    <div className="mb-10">
      <div className="sm:flex block">
        <div className="sm:w-2/4 w-[90vw]">
        <div className="border-l-8 border-black p-3 text-4xl m-4 font-semibold tracking-wider">{data.strMeal}</div>
      <img src={data.strMealThumb} alt={data.strMeal} className="m-4 h-96"/>
      <div className="m-4">
        <span className="font-semibold text-xl">ORIGIN:</span>
        <span className="text-xl tracking-wide pl-1 capitalize">{data.strArea}</span>
      </div>
      <button onClick={handleClick} className="bg-red-600  text-white pl-4 pr-4 p-2 rounded-md border-none font-medium m-4">
        ORDER NOW
      </button>
        </div>
        <div className="sm:pt-28 m-4 sm:block  hidden w-full">
          <div>
            <span className="border-l-4  border-black pl-2 text-3xl m-4 font-semibold text-red-600">INSTRUCTIONS</span>
            <div className="m-4">{data.strInstructions}</div>
          </div>
          <div>
          <span className="font-semibold text-xl m-4">CATEGORY:</span>
          <span className="text-xl tracking-wide pl-1 capitalize">{data.strCategory}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FoodDetails;
