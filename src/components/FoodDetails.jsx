import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";


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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.strMeal}</h1>
      <img src={data.strMealThumb} alt={data.strMeal} />
      {/* Render other details of the data */}
      <div>{data.strArea}</div>
      <button onClick={handleClick}>
        pay now
      </button>
    </div>
  );
};

export default FoodDetails;
