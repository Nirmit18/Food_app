import React, { useMemo, useState } from "react"

const ChildB = (props) => {
    const [val,setval]=useState(0);
    const [dec,setdec]=useState(100);
    const [add,setadd]=useState(10);
    console.log("hello");

    const seeval=useMemo(()=>{
        console.log("******")
        return val*10;
    },[])


  return (


    <div className="flex justify-center flex-col items-center">
      <p >{val}</p>
      {seeval}
      {/* <p>{add}</p> */}
      <button onClick={()=>setval(val+1)} className="border-2 bg-blue-600 text-white p-2">increase</button>
      <button onClick={()=>setdec(dec-1)} className="border-2 bg-blue-600 text-white p-2">decrease</button>

    </div>
  )
};

export default ChildB;
