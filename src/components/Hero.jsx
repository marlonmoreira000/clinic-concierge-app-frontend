import React from "react";
import Typed from "react-typed";

const Hero = () => {
  return (
    <div>
      <div className="max-w-[800px] mx-auto w-full h-[60vh] text-center flex flex-col justify-center">
        <p className="font-bold p-2">GROWING WITH DATA ANALYTICS</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold md:py-6">
          Grow with data.
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-xl sm:text-4xl md:text-5xl font-bold py-4">
            Fast, flexible financing for
          </p>
          <Typed
            className="text-xl sm:text-4xl md:text-5xl font-bold pl-2"
            strings={["BTB", "BTC", "SASS"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500">
          Monitor your data analytics to increase your revenue for BTB, BTC &
          SASS platforms
        </p>
        <button className="bg-[#d3d3d3] w-[200px] rounded-md font-medium mx-auto my-6 py-3">
          Book appointment
        </button>
      </div>
    </div>
  );
};

export default Hero;
