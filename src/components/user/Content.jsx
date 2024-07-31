import ModalAddIncome from "../../components/user/ModalAddIncome";
import ModalAddExpense from "../../components/user/ModalAddExpense";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalAddRicecrop from "../../components/user/ModalAddRicecrop";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Content = ({ status, setStatus }) => {
  const id = useParams();
  const user_id = Number(id.user_id);
  const [data, setData] = useState({});
  const [showModalExpense, setShowModalExpense] = useState(false);
  const [showModalIncome, setShowModalIncome] = useState(false);
  const [riceCaltivation_id, setRiceCaltivation_id] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://deploy-nodejs-render.onrender.com/user/riceCaltivation_incomeExpense/${user_id}`
      );
      if (res.data[0].riceCaltivation.length !== 0) {
        const resRiceCaltivation = res.data[0].riceCaltivation;
        setData(resRiceCaltivation[resRiceCaltivation.length - 1]);
        setRiceCaltivation_id(
          resRiceCaltivation[resRiceCaltivation.length - 1].riceCaltivation_id
        );
        setStatus("old");
      } else {
        setStatus("new");
      }
    };
    fetchData();
  }, [user_id, setStatus]);

  if (!status) {
    return (
      <div className="text-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  const handleModalExpense = () => setShowModalExpense(!showModalExpense);

  const handleModalIncome = () => setShowModalIncome(!showModalIncome);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthString = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return `${day} ${monthString[month]} ${year}`;
  };
  return (
    <div className="mx-auto max-w-screen-xl w-full h-4/6 flex justify-center items-center">
      {status === "old" ? (
        <div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-green-600 leading-none  md:text-6xl lg:text-7xl pb-3">
              พันธุ์ {data.riceVariety}
            </h1>
            <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
              วันที่ปลูก : {formatDate(data.startDate)}
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
              วันที่คาดว่าเก็บเกี่ยว : {formatDate(data.endDate)}
            </p>
            <div className="flex gap-2 md:gap-3 justify-center items-center">
              <button
                className="bg-red-400 h-36 w-36 rounded-full text-white lg:text-red-700 lg:bg-red-200 lg:hover:bg-red-500 lg:hover:text-white hover:duration-500 shadow-md"
                onClick={handleModalExpense}
              >
                บันทึกรายจ่าย
              </button>
              <ModalAddExpense
                showModalExpense={showModalExpense}
                handleModalExpense={handleModalExpense}
                user_id={user_id}
                riceCaltivation_id={riceCaltivation_id}
              />
              <button
                className="bg-green-400 lg:bg-green-300 h-36 w-36 rounded-full  text-white lg:text-green-700 lg:hover:bg-green-500 lg:hover:text-white shadow-md hover:duration-500"
                onClick={handleModalIncome}
              >
                บันทึกรายรับ
              </button>
              <ModalAddIncome
                showModalIncome={showModalIncome}
                handleModalIncome={handleModalIncome}
                user_id={user_id}
                riceCaltivation_id={riceCaltivation_id}
              />
            </div>

            <div className="mt-8">
              <Link
                to={`/ricecrop/history/${user_id}/${riceCaltivation_id}`}
                className="text-white bg-orange-400 hover:bg-orange-100 hover:text-orange-700 py-2 px-4 rounded-full hover:duration-700 shadow-lg"
              >
                ดูรายงานค่าใช้จ่าย
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center px-4">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-700 to-green-600 py-3 font-semibold text-6xl md:text-7xl mb-4"
          >
            เริ่มต้นสร้างรอบการปลูกของคุณ
          </motion.span>
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-gray-500 text-md md:text-xl w-full lg:w-2/3 text-center pb-8"
          >
            เพื่อช่วยให้คุณสามารถจดบันทึกการปลูกข้าว ตรวจสอบผลผลิต
            เลือกพันธุ์ข้าว ดูรายงานแปลงนา และรายงานค่าใช้จ่าย
            ได้อย่างมีประสิทธิภาพ
          </motion.p>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <ModalAddRicecrop />
          </motion.div>
        </div>
      )}
    </div>
  );
};

Content.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func,
};

export default Content;
