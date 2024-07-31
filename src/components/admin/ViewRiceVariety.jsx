import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ViewRiceVariety = ({ id }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://deploy-nodejs-render.onrender.com/riceVariety/${id}`);
        setData(res.data);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <button
        className="flex justify-center items-center"
        onClick={handleModal}
      >
        <div className="hover:bg-sky-400 rounded-md bg-sky-100 text-sky-500 hover:text-white w-8 h-8 flex justify-center items-center border border-sky-200">
          <FaEye className="w-5 h-5" />
        </div>
      </button>

      {modal ? (
        <div className="overflow-x-hidden overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-md lg:max-w-2xl">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex justify-between items-center p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  ข้อมูลพันธุ์ข้าว
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleModal}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>
              <form
                className="p-4 md:p-5 flex flex-col space-y-4"
                encType="multipart/form-data"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3">
                      ชื่อพันธุ์
                    </span>
                    <span className="text-sm text-gray-700">{data.name}</span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3">
                      ชนิด
                    </span>
                    <span className="text-sm text-gray-700">{data.type}</span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3 ">
                      ผลผลิต
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.yield} กก./ไร่
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3 ">
                      ความไวแสง
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.photosensitivity}
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3">
                      อายุเก็บเกี่ยว
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.age} 
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3">
                      ความสูงเฉลี่ย
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.height} ซม.
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3">
                      ลักษณะเด่น
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.stability}
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/3">
                      ข้อควรระวัง
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.precautions}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={data.image}
                    className="w-72 h-48 border"
                  />
                </div>

                <div className="space-x-2 flex justify-end items-center">
                  <button
                    type="button"
                    className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
                    onClick={handleModal}
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

ViewRiceVariety.propTypes = {
  id: PropTypes.number,
};

export default ViewRiceVariety;
