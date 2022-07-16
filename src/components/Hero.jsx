import React from "react";

const Hero = () => {
  return (
    <div className="bg-[url('/src/assets/stonewall-banner.jpg')] bg-no-repeat bg-cover">
      <div className="max-w-[800px] mx-auto w-full h-[60vh] text-center flex flex-col justify-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold md:py-6 text-[#f0edeb]">
          Beachside GP.
        </h1>
        <div className="flex justify-center items-center">
          <p className="text-xl sm:text-4xl md:text-5xl font-bold py-4 text-[#f0edeb]">
            Our GPs care about your wellbeing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
