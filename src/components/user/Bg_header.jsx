import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Bg_header = ({ text }) => {
  return (
    <div className="text-center p-20 bg-cyan-900">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
        }}
      >
        <span className="border-b-2 border-green-400 text-3xl md:text-4xl pb-1 text-white font-bold">
          {text}
        </span>
      </motion.div>
    </div>
  );
};

Bg_header.propTypes = {
  text: PropTypes.string,
};

export default Bg_header;
