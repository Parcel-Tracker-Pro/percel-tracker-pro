import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export function TextFade({
  direction,
  children,
  className = "",
  staggerChildren = 0.1,
}) {
  // Animation variants for fading in and out
  const FADE_DOWN = {
    show: { opacity: 1, y: 0, transition: { type: "ease", duration: 1 } },
    hidden: { opacity: 0, y: direction === "down" ? 0 : 0 },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : ""}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        )
      )}
    </motion.div>
  );
}
