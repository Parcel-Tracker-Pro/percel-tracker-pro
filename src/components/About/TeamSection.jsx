// import React from 'react';
import teamsection from "./../../assets/image/about/about.png";

const TeamSection = () => {
  return (
    <div className="h-[90vh] lg:w-[1000px] px-5 md:px-10 lg:px-0 mx-auto flex flex-col md:flex-row justify-center items-center">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <h2 className="header-text font-bold">About Care Mel</h2>
        <p className="mt-5 lg:mt-10 body-text">
          Care Mel is a Caregiving Service Platform dedicated to providing
          high-quality, personalized home care solutions to individuals and
          families.
        </p>
      </div>
      <div className="md:w-1/2  flex justify-center">
        <img
          src={teamsection} // Replace with your image source
          alt="Caring Team"
          className="rounded-md object-cover w-[400px]"
        />
      </div>
    </div>
  );
};

export default TeamSection;
