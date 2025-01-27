// Card.jsx

const Card = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg flex justify-between h-[200px] overflow-hidden">
      <div className="w-2/5">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="w-3/5 p-4">
        <div>
          <h3 className="card-header font-bold mb-4">{title}</h3>
          <p className="card-body mb-4">{description}</p>
        </div>
        {/* <button className="bg-green-500 text-white py-2 px-4 rounded mt-auto">
          Find Your Caregiver
        </button> */}
      </div>
    </div>
  );
};

export default Card;
