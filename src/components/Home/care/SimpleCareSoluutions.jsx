// SimpleCareSolutions.
import Card from "./Card";
import elder from "./../../../assets/image/home/eldercare.png";
import infant from "./../../../assets/image/home/infantcare.png";
import hospital from "./../../../assets/image/home/hospital.png";
import chronic from "./../../../assets/image/home/chronicare.png";
import child from "./../../../assets/image/home/childcare.png";

const SimpleCareSolutions = () => {
  const cards = [
    {
      image: elder,
      title: "Elderly Care",
      description:
        "We provide caring support for seniors with daily tasks, ensuring comfort and independence at home.",
    },
    {
      image: infant,
      title: "Infant Care",
      description:
        "We provide caring support for infants with daily tasks, ensuring comfort and safety.",
    },
    {
      image: hospital,
      title: "Hospital Care",
      description:
        "We provide caring support for patients with daily tasks, ensuring comfort and independence.",
    },
    {
      image: chronic,
      title: "Chronic Care",
      description:
        "We provide caring support for individuals with daily tasks, ensuring comfort and independence.",
    },
    {
      image: child,
      title: "Child Care",
      description:
        "We provide caring support for children with daily tasks, ensuring comfort and safety.",
    },
  ];

  return (
    <div className="p-8 mt-10">
      <h2 className="header-text font-bold mb-6 text-center">
        Simple Care Solutions
      </h2>
      <p className="body-text text-center mb-8">
        Our easy-to-access care solutions cover daily living needs, from
        personal assistance to companionship, all designed for home comfort.
      </p>
      <div className="grid grid-cols-1 mt-0 md:mt-10 lg:mt-20 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCareSolutions;
