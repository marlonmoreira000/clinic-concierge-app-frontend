import React from "react";
// import Typed from "react-typed";

const Hero = () => {
  return (
    <div className="bg-[url('/src/assets/stonewall-banner.jpg')] bg-no-repeat bg-cover">
      <div className="max-w-[800px] mx-auto w-full h-[60vh] text-center flex flex-col justify-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold md:py-6 text-[#f0edeb]">
          Beachside GP.
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-xl sm:text-4xl md:text-5xl font-bold py-4 text-[#f0edeb]">
            Our GPs care for your wellness.
          </p>
          {/* <Typed
            className="text-xl sm:text-4xl md:text-5xl font-bold pl-2 text-[#f0edeb]"
            strings={["health", "welfare", "vitality"]}
            typeSpeed={160}
            backSpeed={220}
            loop
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
