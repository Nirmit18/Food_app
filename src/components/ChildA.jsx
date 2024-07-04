import React, { useContext } from "react"
import { data,data1 } from "./Home";

const ChildA = (props) => {
    const firstname=useContext(data);
    const g=useContext(data1);
  return (
    <div>
      <p>my name is {firstname} and gender is {g}</p>
    </div>
  )
};

export default ChildA;
