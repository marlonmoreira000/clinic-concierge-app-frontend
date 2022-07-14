import React from "react";

const Newsletter = () => {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold py-2">
            Want to sign up for our newsletter?
          </h1>
          <p>This is some subtext for our newsletter section</p>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <input className="p-3 flex rounded-md w-full text-black bg-[#d3d3d3]" type="email" placeholder="Enter Email..." />
            <button className="bg-[#d3d3d3] w-[200px] rounded-md font-medium mx-auto my-6 py-3 ml-4">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
