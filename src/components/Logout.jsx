import React from "react"
import axios from "axios";

const Logout = (props) => {
     const clicked = async()=>{
        try{
            await axios.post("/api/logout")
        }catch{
            console.log("there is some error logging out")
        }
     }

  return (
    <div>
      <button onClick={clicked}>click</button>
    </div>
  )
};

export default Logout;
