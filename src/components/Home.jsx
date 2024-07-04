import axios from "axios";
import React, { useState, useEffect } from "react";
import ChildD from "./ChildD";




const Home = (props) => {
  const [data,setdata]=useState([]);

  const fetchdata = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        setdata(response.data.categories);
      } catch (error) {
         console.error("there is some error",error)
      }
  };


  useEffect(() => {
    fetchdata();
  }, []);

  console.log(data);
  return (
    <div className="m-8 ">
      <div className="flex flex-wrap justify-evenly gap-7 h-screen">
        {data.map((meal) => (
        <div key={meal.idCategory} >
          <ChildD meal={meal} />
        </div>
      ))}
      </div>

  </div>
  );
};

export default Home;


