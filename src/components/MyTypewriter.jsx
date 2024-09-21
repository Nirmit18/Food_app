import React from "react";
import Typewriter from "typewriter-effect"; // Importing the Typewriter component from the library

const MyTypewriter = (props) => {
  return (
    <div className="text-5xl font-medium text-red-600 flex pt-20 pl-10 pb-10 w-full tracking-widest">
      <Typewriter
        options={{
          loop: true, // Enable infinite loop
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("Food On The Go")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Yummy Bites...")
            .pauseFor(1000)
            .deleteAll()
            .typeString("Order Now")
            .pauseFor(1000)
            .start();
        }}
      />
    </div>
  );
};

export default MyTypewriter;
