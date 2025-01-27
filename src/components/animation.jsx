import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import PropTypes from "prop-types";

const Animation = ({ animationData }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const animationInstance = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => animationInstance.destroy();
  }, [animationData]);

  return (
    <div ref={animationContainer} style={{ width: "50px", height: "50px" }} />
  );
};

Animation.propTypes = {
  animationData: PropTypes.object.isRequired,
};

export default Animation;
