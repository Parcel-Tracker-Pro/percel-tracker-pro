// import React from 'react';
import { Link } from "react-router-dom";
import missionImage from "./../../assets/image/home/mission.jpg"; // Update with the actual image path
// import Collaborate from "./Collaborate";
const Mission = () => {
  return (
    <div className="mt-20 p-5 lg:w-[1000px] mx-auto md:text-center">
      <h2 className="header-text font-bold">
        Our Mission: Caring for Every Family
      </h2>
      {/* <p className="body-text font-medium mt-2">
        We’re here to make caregiving a positive, reassuring <br /> experience
        for every family.
      </p> */}
      <div className="flex flex-col md:flex-row items-center md:mt-6 bg-white rounded-lg py-4">
        <div className="md:w-1/2 rounded-lg overflow-hidden mt-5">
          <img
            src={missionImage}
            alt="Caring Family"
            className="w-full object-cover"
          />
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2 md:px-5 flex flex-col">
          <p className="body-text font-medium mb-4 text-start">
            We’re dedicated to making caregiving a positive experience for every
            family. Our team provides compassionate, personalized support,
            ensuring your loved ones feel respected and cared for.
          </p>
          <p className="body-text font-medium mb-4 text-start">
            With a focus on quality and trust, we create care plans that fit
            each family’s unique needs, giving you peace of mind every step of
            the way.
          </p>
          <Link
            to="/about"
            className="text-lg md:mt-0 mt-4 md:w-[300px] inline-block border border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-xl py-2 px-4 transition duration-300"
          >
            About Care Mel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mission;
