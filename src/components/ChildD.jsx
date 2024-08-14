import React from "react"


const ChildD = ({meal}) => {

  return (
    <>
    <div className="border-4 ">
    <div className="flex  items-center flex-col shadow-2xl pb-2">
    <img src={meal.strCategoryThumb}  alt="food_img"/>
    <div className="p-2 text-xl font-medium">{meal.strCategory}</div>
    </div>
  </div>
  </>
  )
};

export default ChildD;
