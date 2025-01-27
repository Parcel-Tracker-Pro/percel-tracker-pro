import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const testimonials = [
  {
    quote: "The support we received was incredible!",
    description:
      "Our caregiver was attentive and knowledgeable, making those early weeks so much easier. We felt confident leaving our newborn in such caring hands.",
    name: "Ko Ko Oo",
    service: "Newborn care Service",
  },
  {
    quote: "The support we received",
    description:
      "Our caregiver was attentive and knowledgeable, making those early weeks so much easier. We felt confident leaving our newborn in such caring hands.",
    name: "Khin Khin",
    service: "Newborn care Service",
  },
  // Add more testimonials as needed
];

const Testmonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const { quote, description, name, service } = testimonials[currentIndex];

  return (
    <div className="mx-auto px-5 md:px-10 lg:px-0 py-[64px] lg:w-[1000px] ">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/3">
          <h2 className="header-text font-bold mb-4">
            Hear From Our <br />
            Clients
          </h2>
          <p className="body-text mb-6">
            Families love our caregivers! Check out their testimonials to learn
            about their positive experiences.
          </p>
        </div>
        <div className="md:w-2/3 md:px-5 md:flex justify-between items-center ">
          <button
            onClick={previousTestimonial}
            className="hidden md:block mx-2 px-4 py-4 bg-primary text-white rounded hover:bg-green-700 hover:text-white active:scale-90"
          >
            <IoIosArrowBack size={20} />
          </button>
          <div className="mb-5 md:mb-0 p-5 lg:px-10 bg-gray-100 md:bg-white">
            <div className="text-2xl font-bold mb-4">
              <p className="">{quote}</p>
            </div>
            <p className="text-gray-700">{description}</p>
            <div className="md:flex justify-between pt-5">
              <p className="font-bold">{name}</p>
              <p className="text-primary fon-bold">{service}</p>
            </div>
          </div>
          {/* <div className="flex mt-4"> */}
          <button
            onClick={previousTestimonial}
            className="md:hidden mx-2 px-4 py-4 bg-primary text-white rounded hover:bg-green-700 hover:text-white active:scale-90"
          >
            <IoIosArrowBack size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="md:block mx-2 px-4 py-4 bg-primary text-white rounded hover:bg-green-700 hover:text-white active:scale-90"
          >
            <IoIosArrowForward size={20} />
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Testmonial;
