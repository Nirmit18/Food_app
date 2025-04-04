import axios from "axios";
import React, { useState, useEffect } from "react";
import ChildD from "./ChildD";
import MyTypewriter from "./MyTypewriter";


const Home = (props) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://food-app-914l.onrender.com/api/categories");
      setData(response.data.categories);
    } catch (error) {
      console.log("there is some error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className="bg-neutral-100">
      <MyTypewriter />
      <div className=" ">
        <div className="flex flex-wrap justify-evenly gap-7 pt-8 pb-10">
          {data.map((meal) => (
            <div key={meal.idCategory}>
              <ChildD meal={meal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
