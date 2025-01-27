// import React from 'react';
import cards from "./../../assets/image/home/Card.png";
// Data for steps
const stepsData = [
  {
    title: "Start with a Simple Message",
    description: "Inquire about our services via Messenger to begin.",
    icon: cards, // replace with actual icon path
  },
  {
    title: "Discuss Your Care Needs",
    description:
      "Our team connects with you by phone to understand your needs.",
    icon: cards, // replace with actual icon path
  },
  {
    title: "Find Your Perfect Match",
    description: "We search for a caregiver who’s just right for you.",
    icon: cards, // replace with actual icon path
  },
  {
    title: "Meet Your Caregiver",
    description: "We connect you with a caregiver ready to provide support.",
    icon: cards, // replace with actual icon path
  },
];

const Steps = () => {
  return (
    <div className="p-10 bg-green-500 text-white">
      <h2 className="text-3xl mt-5 font-bold text-center mb-4">
        Just <span className="text-black"> 4 Simple Steps </span> to Hire <br />{" "}
        a Caregiver
      </h2>
      <p className="text-center text-lg mb-6">
        Don't stress over hiring a caregiver! <br />
        It’s easier than you think.
      </p>
      <div className="flex w-full flex-wrap justify-center">
        {stepsData.map((step, index) => (
          <div
            key={index}
            className="text-green-600 rounded-lg p-4 mb-4 md:mb-0 w-full sm:w-1/2 lg:w-1/4 text-center"
          >
            <h3 className="font-semibold text-white text-xl">
              Step {index + 1}
            </h3>
            <div className="my-4">
              <img
                src={step.icon}
                alt={`Icon for ${step.title}`}
                className="w-64 mx-auto"
              />
            </div>
            <p className="font-medium text-black text-lg mb-2">{step.title}</p>
            <p className="text-white">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
