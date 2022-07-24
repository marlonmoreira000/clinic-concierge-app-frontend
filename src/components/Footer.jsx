import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-[#23375d]">
      <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#f0edeb]">
            Beachside GP.
          </h1>
          <p className="py-4 pr-[1rem]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit
            ullam iste repellat consequatur libero reiciendis, blanditiis
            accusantium.
          </p>
          <div className="flex justify-between md:w-[75%] my-6">
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
          </div>
        </div>
        <div className="lg:col-span-2 flex justify-between mt-6">
          <div>
            <h6 className="font-medium text-gray-400">Information</h6>
            <ul>
              <li className="py-2 text-sm">Our Practice</li>
              <li className="py-2 text-sm">Our Values</li>
              <li className="py-2 text-sm">Our History</li>
              <li className="py-2 text-sm">Fees</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-400">Services</h6>
            <ul>
              <li className="py-2 text-sm">Pricing</li>
              <li className="py-2 text-sm">Documentation</li>
              <li className="py-2 text-sm">Guides</li>
              <li className="py-2 text-sm">API Status</li>
            </ul>
          </div>
          <div>
            <h6 className="font-medium text-gray-400">Contact</h6>
            <ul>
              <li className="py-2 text-sm">First Floor 142 Ronton Rd,</li>
              <li className="py-2 text-sm">Cremorne NSW 6010</li>
              <li className="py-2 text-sm">info@beachsidegp.com.au</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
