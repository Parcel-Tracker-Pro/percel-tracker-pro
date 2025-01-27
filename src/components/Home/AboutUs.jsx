import { useState } from "react";
import { motion } from "framer-motion";
// import Skeleton from "react-loading-skeleton"; // Import the skeleton loader
import elder from "./../../assets/image/home/eld.jpg";
import infant from "./../../assets/image/home/newborn.png";
import hospital from "./../../assets/image/home/hospitalcare.png";
import child from "./../../assets/image/home/childcare.png";
import { FaBaby, FaChild, FaHospitalAlt, FaUserFriends } from "react-icons/fa";

export const services = {
  InfantCare: {
    icon: <FaBaby />,
    image: infant,
    title: "Newborn Care",
    description:
      "“Our caregivers provide gentle and nurturing care for infants, ensuring safety and well-being”",
  },
  childCare: {
    icon: <FaChild />,
    image: child,
    title: "Child Care",
    description:
      "“Reliable and compassionate childcare services, providing parents peace of mind knowing their children are in safe hands.”",
  },
  hospitalCare: {
    icon: <FaHospitalAlt />,
    image: hospital,
    title: "Hospital Companion Care",
    description:
      "“We offer companionship and support for those in hospital settings, making recovery less lonely and more comfortable”",
  },
  elderCare: {
    icon: <FaUserFriends />,
    image: elder,
    title: "Elder Care",
    description:
      "“We offer warm, attentive support for seniors, assisting with daily tasks to maintain comfort and independence at home.”",
  },
};

const AboutUs = ({ classData }) => {
  const [selectedService, setSelectedService] = useState("childCare");
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (service) => {
    setLoading(true); // Start loading
    setSelectedService(service);

    // Simulating a delay for loading the image (you can replace this with actual image loading logic)
    setTimeout(() => {
      setLoading(false); // Stop loading after a delay
    }, 300); // Adjust the timeout as necessary
  };

  return (
    <div className="mx-auto px-5 py-10 lg:px-0 lg:py-[64px] lg:w-[1000px]">
      <div className={`${classData} mx-auto`}>
        <p className="header-text font-bold md:text-center">
          Compassionate Care for Every Family
        </p>
        <p className="body-text md:w-[550px] mx-auto md:text-center mt-5">
          Whether you need daily support or occasional assistance, our care
          services are designed to provide your family with dependable,
          nurturing care.
        </p>
      </div>
      <div className="w-[320px] sm:w-full mx-auto md:flex flex-col md:flex-row items-start mt-10 space-y-4 md:space-y-0 md:space-x-4">
        <div className="shadow-2xl h-full md:h-[250px] lg:h-[350px] flex flex-col justify-center px-4 rounded-lg mb-4 md:mb-0 mx-auto w-full sm:w-[300px] md:w-1/3">
          <ul className="flex md:flex-col h-full justify-between py-4 md:py-0 lg:py-5">
            {Object.keys(services).map((serviceKey) => (
              <li
                key={serviceKey}
                className={`flex items-center cursor-pointer px-4 md:py-3 py-4 rounded-md text-lg font-medium transition duration-300 ${
                  selectedService === serviceKey
                    ? "bg-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
                onClick={() => handleServiceChange(serviceKey)}
              >
                <p className="flex text-xl  items-center">
                  {services[serviceKey]?.icon}
                  <span className="ms-2 text-sm md:text-md lg:text-xl hidden md:block">
                    {services[serviceKey].title}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="shadow-2xl rounded-lg md:h-[250px] lg:h-[350px] p-6 sm:flex items-center md:w-2/3 overflow-hidden">
          <div className="overflow-hidden sm:mr-4 h-[300px] sm:h-full sm:w-[250px] md:w-[200px] lg:w-[250px]">
            {/* Show skeleton if loading, else show the image */}

            <img
              key={selectedService}
              src={services[selectedService].image}
              alt={services[selectedService].title}
              className="w-full h-full"
            />
          </div>

          <motion.div
            key={selectedService}
            className="flex flex-col justify-between py-10 lg:py-5 w-full md:w-1/2"
          >
            <div className="mb-5">
              <h3 className="font-bold text-xl lg:text-3xl mb-3">
                {services[selectedService].title}
              </h3>
              <p className="md:text-[15px] lg:text-[18px] lg:leading-8 mb-5 sm:mb-0">
                {services[selectedService].description}
              </p>
            </div>

            <a
              href="https://m.me/197568866770556?source=qr_link_share"
              target="_blank"
              className="xs:text-[12px] sm:text-[10px] md:text-[12px] lg:text-[15px] text-primary bg-white font-bold border border-primary rounded-xl py-3 text-center hover:bg-primary transition duration-300 hover:text-white"
            >
              Explore {services[selectedService].title}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
