import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const View_RiceCaltivation = ({ id }) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://deploy-nodejs-render.onrender.com/riceCaltivation/${id}`
      );
      setData(res.data);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <button
        className="flex justify-center items-center"
        onClick={() => setModal(!modal)}
      >
        <div className="hover:bg-sky-400 rounded-md bg-sky-100 text-sky-500 hover:text-white w-8 h-8 flex justify-center items-center border border-sky-200">
          <FaEye className="w-5 h-5" />
        </div>
      </button>

      {modal ? (
        <div className="overflow-x-hidden overflow-y-auto fixed top-0 right-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-md lg:max-w-lg">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex justify-between items-center p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  ข้อมูลรอบการปลูก
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => setModal(!modal)}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>
              <form
                className="p-4 md:p-5 flex flex-col space-y-4"
                encType="multipart/form-data"
              >
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      ปี
                    </span>
                    <span className="text-sm text-gray-700">{data.year}</span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2 ">
                      วันที่ปลูก
                    </span>
                    <span className="text-sm text-gray-700">
                      {new Date(data.startDate).getDate()}/
                      {new Date(data.startDate).getMonth() + 1}/
                      {new Date(data.startDate).getFullYear()}
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      วันที่คาดว่าจะเก็บเกี่ยว
                    </span>
                    <span className="text-sm text-gray-700">
                      {new Date(data.endDate).getDate()}/
                      {new Date(data.endDate).getMonth() + 1}/
                      {new Date(data.endDate).getFullYear()}
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      พันธุ์ข้าว
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.riceVariety}
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      พื้นที่
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.area} ไร่
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      ปริมาณข้าวที่ได้
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.total_yield} กิโลกรัม
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      ปริมาณข้าวที่ขาย
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.yield} กิโลกรัม
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      ราคาต่อกิโลกรัม
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.rice_price_per_kg} บาท
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      จำนวนเงิน
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.yield * data.rice_price_per_kg} บาท
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      เก็บไว้บริโภค
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.rice_consumption} กิโลกรัม
                    </span>
                  </div>
                  <div className="flex text-start">
                    <span className="text-sm font-medium text-gray-900 w-1/2">
                      เก็บไว้ทำเมล็ดพันธุ์
                    </span>
                    <span className="text-sm text-gray-700">
                      {data.seed_rice} กิโลกรัม
                    </span>
                  </div>
                </div>

                <div className="space-x-2 flex justify-end items-center">
                  <button
                    type="button"
                    className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
                    onClick={() => setModal(!modal)}
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

View_RiceCaltivation.propTypes = {
  id: PropTypes.number,
};

export default View_RiceCaltivation;
