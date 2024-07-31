import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
const Cards = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [dataById, setDataById] = useState({});

  const handleModal = async (id) => {
    setModal(!modal);
    const res = await axios.get(
      `https://deploy-nodejs-render.onrender.com/riceVariety/${id}`
    );
    setDataById(res.data);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 w-full px-4 mb-6">
      {data.map((d, i) => (
        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:-translate-y-1 hover:scale-100 hover:shadow-2xl hover:duration-700 cursor-pointer"
          key={i}
          onClick={() => handleModal(d.riceVariety_id)}
        >
          <img
            className="rounded-t-lg w-full h-32 md:h-48"
            src={d.image}
          />

          <div className="p-2 sm:p-5">
            <h5 className="md:text-2xl font-semibold tracking-tight text-gray-600 pl-2">
              พันธุ์ : {d.name === "" ? "กำลังโหลด..." : d.name}
            </h5>

            <div className="flex flex-wrap text-xs lg:text-sm gap-1 my-2">
              <div className="py-1 px-2 rounded-full text-violet-600 bg-violet-50">
                {data.type === "" ? "กำลังโหลด..." : d.type}
              </div>
              <div className="py-1 px-2 bg-orange-50 rounded-full text-orange-600">
                {data.photosensitivity === "" ? "กำลังโหลด..." : d.photosensitivity}
              </div>
            </div>

            <p className="text-xs lg:text-sm text-gray-700 mb-3 pl-2">
              ผลผลิต : {data.yield === "" ? "กำลังโหลด..." : d.yield} กก./ไร่
            </p>
          </div>
        </div>
      ))}
      {modal ? (
        <div className="fixed top-0 left-0 right-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-sm max-h-full">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow p-4"
            >
              <div>
                <img
                  src={dataById.image}
                  className="rounded-lg h-48 w-full"
                />
                <div className="mb-2">
                  <div className="pt-2 pb-1">
                    <span className="font-semibold text-lg text-green-700">
                      ข้อมูลพันธุ์ข้าว {dataById.name === "" ? "กำลังโหลด..." : dataById.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      ชนิด
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.type === "" ? "กำลังโหลด..." : dataById.type}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      อายุเก็บเกี่ยว
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.age === "" ? "กำลังโหลด..." : dataById.age}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      ความไวแสง
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.photosensitivity === "" ? "กำลังโหลด..." : dataById.photosensitivity}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      ความสูง
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.hieght === "" ? "กำลังโหลด..." : dataById.height} เซนติเมตร
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      ผลผลิต
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.yield === "" ? "กำลังโหลด..." : dataById.yield} กก./ไร่
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      ลักษณะเด่น
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.stability === "" ? "กำลังโหลด..." : dataById.stability}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-1/2 pr-2 text-sm font-medium text-gray-800">
                      ข้อควรระวัง
                    </span>
                    <span className="w-1/2 text-sm text-gray-600">
                      {dataById.precautions === "" ? "กำลังโหลด..." : dataById.precautions}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="button"
                    onClick={() => setModal(!modal)}
                    className="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-100 hover:text-green-700 hover:duration-500"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Cards.propTypes = {
  data: PropTypes.array,
};

export default Cards;
