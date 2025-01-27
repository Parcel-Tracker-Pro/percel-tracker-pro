import { motion } from "framer-motion";
import herobanner from "./../../assets/image/home/banner.jpg";
// import { GradualSpacing } from "../animaition/GradualSpacing";

const HeroBanner = () => {
  return (
    <div className="py-[64px] px-5 md:py-10 md:py-10 mx-auto lg:h-[90vh]">
      <div className="flex h-full items-center">
        <motion.div
          className="w-1/2 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={herobanner} alt="Hero Banner" className="shadow-sm" />
        </motion.div>
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="ml-0 md:ml-5">
            <h2 className="text-[32px] lg:text-4xl font-bold">
              Looking For Daycare Services
            </h2>
            <motion.p
              initial={{ opacity: 0, x: -200 }} // Image enters with a slight slide up
              animate={{ opacity: 1, x: 0 }} // Final state
              exit={{ opacity: 0, x: 200 }} // Exit animation
              transition={{ duration: 1, delay: 0.5 }} // Transition duration
              className="text-[32px] lg:text-4xl font-bold mt-2 md:mt-5"
            >
              Call us straight away!
            </motion.p>
            <a
              href="https://m.me/197568866770556?source=qr_link_share"
              target="_blank"
              className="inline-block mt-10 bg-primary text-[20px] font-semibold text-white py-5 px-10 rounded-xl hover:bg-green-600 transition duration-200"
            >
              Book a caregiving service
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroBanner;
