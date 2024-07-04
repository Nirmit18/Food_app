import React from "react"


const ChildD = ({meal}) => {

  return (
    <div className="border-2 ">
    <div className="flex  items-center flex-col ">
    <img src={meal.strCategoryThumb}  />
    <div >{meal.strCategory}</div>
    </div>
  </div>
  )
};

export default ChildD;
