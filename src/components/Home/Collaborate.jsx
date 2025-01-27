// Collaborate.js
import logo1 from "./../../assets/image/apostel.jpg";
import logo2 from "./../../assets/image/crossborder.png";
import logo3 from "./../../assets/image/otas.png";
import logo4 from "./../../assets/image/home/Platocare.png";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "@react-spring/web";

function Number({ n }) {
  const [ref, inView] = useInView();
  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? n : 0,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.span ref={ref}>{number.to((n) => n.toFixed(0))}</animated.span>
  );
}
const partners = [
  { name: "Apostle Med", logo: logo2 }, // Replace with actual logo URL
  {
    name: "Cross-Border Health and Caregiving Club",
    logo: logo1,
  }, // Replace with actual logo URL
  { name: "OTAS Tech Solutions", logo: logo3 }, // Replace with actual logo URL
  { name: "Plato Care", logo: logo4 }, // Replace with actual logo URL
];

const Collaborate = () => {
  return (
    <div className="mx-auto px-5 md:px-10 py-4 lg:px-0 lg:w-[1000px] sm:py-6 md:py-8 mt-1 sm:mt-2 md:mt-5">
      <div className="mb-10 flex flex-col md:flex-row justify-around md:bg-green-600 text-white rounded-lg md:shadow-lg md:p-10">
        <div className="mb-4 md:mb-0 md:w-1/3 md:bg-priamry text-primary md:text-white py-5 px-10 md:p-0 rounded-3xl">
          <h3 className="text-md md:text-xl font-bold">
            Registered Caregivers
          </h3>
          <p className="text-[38px] mt-2 font-bold">
            {" "}
            <Number n={60} />+ Caregivers
          </p>
        </div>
        <div className="md:text-center mb-4 md:mb-0 md:w-1/3 md:bg-priamry text-primary md:text-white py-5 px-10 md:p-0 rounded-3xl">
          <h3 className="text-xl font-bold">Successful Served Duties</h3>
          <p className="text-[38px] mt-2 font-bold">
            <Number n={130} />+ Duties
          </p>
        </div>
        <div className="md:text-end mb-4 md:mb-0 md:w-1/3 md:bg-priamry text-primary md:text-white py-5 px-10 md:p-0 rounded-3xl">
          <h3 className="text-xl font-bold">Trusted by Families</h3>
          <p className="text-[38px] mt-2 font-bold">
            <Number n={10} />+ Families
          </p>
        </div>
      </div>
      <div className="md:py-20 border-slate-300 flex flex-col items-center md:items-start rounded-lg py-5 md:py-0">
        <h2 className="text-center mx-auto header-text font-bold sm:mb-0 md:mb-4">
          Our Partner Organizations
        </h2>
        <div className="sm:flex flex-wrap gap-4 sm:gap-10 md:gap-8 lg:gap-10 sm:mt-0 md:mt-10 mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col my-8 items-center justify-center"
            >
              <div>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-16 md:h-24 mb-1 sm:mb-2"
                />
              </div>
              <span className="w-[200px] mx-auto text-center text-sm sm:text-base md:text-lg">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collaborate;
