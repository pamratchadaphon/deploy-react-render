import Navbar from "../../components/user/Navbar";
import NewsService from "../../components/user/NewsService";
import Content from "../../components/user/Content";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const HomePageUser = () => {
  const user_id = Number(useParams().user_id);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.get(
          `https://deploy-nodejs-render.onrender.com/user/${user_id}`
        );
        setFname(resUser.data.fname);
        setLname(resUser.data.lname);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user_id]);

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-r from-green-100 to-blue-100">
      <div>
        <Navbar id={user_id} page={"home"} />
        {status === "new" ? (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center mx-auto max-w-screen-xl w-full px-4 gap-2 pt-10 text-xl md:text-2xl"
          >
            <div className=" text-gray-400">สวัสดี</div>
            <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-l to-emerald-500 from-green-600">
              {fname} {lname}
            </h1>
          </motion.div>
        ) : (
          <div className="flex items-center mx-auto max-w-screen-xl w-full px-4 gap-2 pt-10 text-xl md:text-2xl">
            <div className=" text-gray-400">สวัสดี</div>
            <h1 className="font-semibold text-transparent bg-clip-text bg-gradient-to-l to-emerald-500 from-green-600">
              {fname} {lname}
            </h1>
          </div>
        )}
      </div>
      <Content status={status} setStatus={setStatus} />
      <NewsService />
    </div>
  );
};

export default HomePageUser;
