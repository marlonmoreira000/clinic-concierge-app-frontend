import React from "react";

const Header = (props) => {
  return (
    <div className="bg-[#23375d]">
      <h1 className="text-center text-4xl sm:text-6xl md:text-7xl font-bold py-16 md:py-22 lg:py-28 text-[#f0edeb]">
        {props.text}
      </h1>
    </div>
  );
};

export default Header;
