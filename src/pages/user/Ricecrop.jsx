import { useParams } from "react-router-dom";
import ModalAddRicecrop from "../../components/user/ModalAddRicecrop";
import Navbar from "../../components/user/Navbar";
import TableRicecrop from "../../components/user/TableRicecrop";
import { motion } from "framer-motion";

const Ricecrop = () => {
  const user_id = Number(useParams().user_id);

  return (
    <div>
      <Navbar id={user_id} page={"riceCaltivation"} />
      <div className="mx-auto max-w-screen-xl h-screen flex flex-col gap-4 pt-4 px-4">
        <div className="md:hidden">
          <ModalAddRicecrop />
        </div>
        <motion.div
          initial={{ x: -100, opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex justify-between items-center"
        >
          <ModalAddRicecrop />
        </motion.div>
        <div>
          <TableRicecrop user_id={user_id} />
        </div>
      </div>
    </div>
  );
};

export default Ricecrop;
