import React from "react";
import Medical from "../assets/medical-team.png";

const Services = () => {
  return (
    <div className="w-full bg-[#d3d3d3] py-16 px-4 ">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[400px] mx-auto my-4" src={Medical} alt="medical-team" />
        <div className="flex flex-col justify-center ">
          <p className="font-bold">OUR SERVICES</p>
          <h1 className="text-2xl md:text-4xl font-bold py-2">These are the services available at our clinic</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus similique recusandae aliquid assumenda id laboriosam
            dignissimos, sit numquam asperiores excepturi dolores ratione odio
            tenetur aut, reprehenderit itaque ex quisquam voluptate?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
