import { AnimatePresence, motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// Character motion component
const AnimatedCharacter = ({ char, delay, fontSize }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      exit={{ opacity: 0, x: 18 }}
      transition={{ duration: 0.1, delay }}
      className={`text-${fontSize} font-bold tracking-tighter md:leading-[4rem]`} // Adjusted for dynamic font size
    >
      {char === " " ? <span>&nbsp;</span> : char}
    </motion.p>
  );
};

// Gradual Spacing Component
export function GradualSpacing({ text = "Gradual Spacing", fontSize = "xl" }) {
  return (
    <div className="flex md:space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <AnimatedCharacter
            key={i}
            char={char}
            delay={i * 0.1}
            fontSize={fontSize}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
