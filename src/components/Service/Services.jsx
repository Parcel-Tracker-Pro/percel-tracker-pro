// import React from 'react'
import elder from "./../../assets/image/home/eldercare.png";
import infant from "./../../assets/image/home/infantcare.png";
import hospital from "./../../assets/image/home/hospital.png";
// import chronic from "./../../../assets/image/home/chronicare.png";
import child from "./../../assets/image/home/childcare.png";
import { useState } from "react";
import { motion } from "framer-motion";
import { services } from "../Home/AboutUs";

function Services() {
  const [selectedService, setSelectedService] = useState("childCare");

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };
  return (
    <div className="pb-10 w-[1000px] mx-auto">
      <div className="bg-slate-200 p-4 rounded-lg mb-4">
        <ul className="flex justify-between w-full items-center">
          {Object.keys(services).map((serviceKey) => (
            <li
              key={serviceKey}
              className={`flex items-center cursor-pointer px-4 py-2 rounded-md text-lg font-medium transition duration-300 ease-in-out transform ${
                selectedService === serviceKey
                  ? "bg-green-600 text-white"
                  : "hover:bg-green-600 hover:text-white"
              }`}
              onClick={() => handleServiceChange(serviceKey)}
            >
              {services[serviceKey].title}
            </li>
          ))}
        </ul>
      </div>
      <div className=" rounded-lg shadow-lg h-[300px] p-6 flex items-center overflow-hidden">
        <div className="w-[764px] h-[280px] mr-4">
          <motion.img
            src={services[selectedService].image}
            alt={services[selectedService].title}
            key={selectedService}
            className="w-full h-full rounded-lg"
            initial={{ opacity: 0, y: 200 }} // Image enters with a slight slide up
            animate={{ opacity: 1, y: 0 }} // Final state
            exit={{ opacity: 0, y: -200 }} // Exit animation
            transition={{ duration: 1 }} // Transition duration
          />
        </div>

        <motion.div
          key={selectedService}
          className="flex-grow h-full flex flex-col justify-between"
          initial={{ opacity: 0, y: 200 }} // Image enters with a slight slide up
          animate={{ opacity: 1, y: 0 }} // Final state
          exit={{ opacity: 0, y: -200 }} // Exit animation
          transition={{ duration: 1 }} // Transition duration
        >
          <h3 className="font-bold text-3xl">
            {services[selectedService].title}
          </h3>
          <p className="mb-4 font-medium text-2xl leading-relaxed">
            {services[selectedService].description}
          </p>
          <a
            href="#"
            className="text-green-500 text-md w-64 bg-white font-bold border border-green-500 rounded-xl py-4 px-4 hover:bg-green-600 transition duration-300 hover:text-white"
          >
            Explore Our {services[selectedService].title}
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default Services;
