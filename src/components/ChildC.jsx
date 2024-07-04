import React, { useState } from "react"

const ChildC = (props) => {
    const [val,setval]=useState("");
    const changer=(e)=>{
        setval(e.target.value)
    }
    console.log(val)
   

    
  return (
    <div class="flex justify-center flex-col items-center m-10">
    <div class="border-2">
        <form action="">
          <input type="email" placeholder="enter email" value={val} onChange={changer} />
          <input type="text" name="" id="" placeholder="enter name" onChange={changer}/>
        </form>
    </div>
    </div>

  )
};

export default ChildC;
