import Navbar from "../../components/user/Navbar";
// import { IoIosArrowForward } from "react-icons/io";
import Info_ricecrop from "../../components/user/Info_ricecrop";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Yield_rice from "../../components/user/Yield_rice";
import Stored_Rice from "../../components/user/Stored_Rice";
import { motion } from "framer-motion";
import Bg_header from "../../components/user/Bg_header";

const Detail_RiceCaltivationjsx = () => {
  const user_id = Number(useParams().user_id);
  const riceCaltivation_id = Number(useParams().riceCaltivation_id);

  const [riceCaltivation, setRiceCaltivation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`
        );
        setRiceCaltivation(res.data);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [riceCaltivation_id]);

  if (!riceCaltivation) {
    return (
      <div className="text-center">
        <p>กำลังโหลด...</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar id={user_id} />
      <Bg_header text={'รายงานแปลงนา'}/>
      <div className="mx-auto max-w-screen-xl space-y-4 flex flex-col p-6 md:p-8 w-full">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            duration: "1",
          }}
          className="flex flex-col lg:flex-row gap-6 md:gap-8 justify-between"
        >
          <Info_ricecrop
            riceCaltivation={riceCaltivation}
          />
          <Yield_rice riceCaltivation={riceCaltivation} />
          <Stored_Rice riceCaltivation={riceCaltivation} />
        </motion.div>
      </div>
    </div>
  );
};

export default Detail_RiceCaltivationjsx;
