import {motion} from "framer-motion";


const ChatBar = () => {
  const letters1 = "GPT".split("");
  const letters2 = "GCEK".split("");
  return (
    <div className="relative">
      <div className="absolute left-6 top-[25%]  text-white text-sm flex">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex"
        >
          {letters1.map((letter, index) => (
            <motion.span key={index} variants={TextVariants}>
              {letter}
            </motion.span>
          ))}

          <div className="w-[10px]"></div>
          {letters2.map((letter, index) => (
            <motion.span key={index} variants={TextVariants}>
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="absolute right-2 top-[5px] ">
        <motion.svg
          width="33"
          height="34"
          viewBox="0 0 33 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{rotate: 360}}
          transition={{repeat: Infinity, duration: 10, ease: "linear"}}
        >
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(1 0 0 -1 17.4883 17.7695)"
            fill="#FF2A6D"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(1 0 0 -1 0 17.6777)"
            fill="#FBF840"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 16.4531 18.2715)"
            fill="#FBF840"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(0 1 1 0 15.5117 0)"
            fill="#E65AFF"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16.4082 15.3398)"
            fill="#FF4A4A"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(-0.707107 0.707107 0.707107 0.707107 27.4219 4.37109)"
            fill="#2282FF"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(-0.707107 0.707107 0.707107 0.707107 15.0117 16.873)"
            fill="#FF6828"
          />
          <ellipse
            cx="7.75631"
            cy="0.987167"
            rx="7.75631"
            ry="0.987167"
            transform="matrix(0 1 1 0 15.5117 17.6777)"
            fill="#0EEB88"
          />
        </motion.svg>
      </div>
      <svg
        width="237"
        height="44"
        viewBox="0 0 237 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M236.5 43.5L0.5 43.5V22.1871L19.3679 0.499996L236.5 0.499996L236.5 22V43.5Z"
          fill="black"
          fillOpacity="0.73"
          stroke="url(#paint0_linear_373_2)"
        />

        <defs>
          <linearGradient
            id="paint0_linear_373_2"
            x1="0"
            y1="22"
            x2="237"
            y2="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#51A8FF" />
            <stop offset="1" stopColor="#399CFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.06},
  },
};

const TextVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0, transition: {duration: 0.1}},
};

export default ChatBar;
