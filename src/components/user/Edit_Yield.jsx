import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Edit_Yield = ({ riceCaltivation_id }) => {
  const [modal, setModal] = useState(false);
  const [yield_rice, setYield_Rice] = useState({});

  const [values, setValues] = useState({
    total_yield: "",
    yield: "",
    rice_price_per_kg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`
        );
        res.data.length !== 0 ? setYield_Rice(res.data) : null;
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [riceCaltivation_id]);

  useEffect(() => {
    setValues({
      ...values,
      total_yield: yield_rice.total_yield,
      yield: yield_rice.yield,
      rice_price_per_kg: yield_rice.rice_price_per_kg,
    });
  }, [yield_rice]);

  const [total_yield, setTotal_yield] = useState(false);
  const [yield_input, setYield] = useState(false);
  const [rice_price_per_kg, setRice_price_per_kg] = useState(false);

  const check = () => {
    values.total_yield === "" ? setTotal_yield(true) : null;
    values.yield === "" ? setYield(true) : null;
    values.rice_price_per_kg === "" ? setRice_price_per_kg(true) : null;
  };

  useEffect(() => setTotal_yield(false), [values.total_yield]);
  useEffect(() => setYield(false), [values.yield]);
  useEffect(() => setRice_price_per_kg(false), [values.rice_price_per_kg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (
      values.yield !== "" &&
      values.total_yield !== "" &&
      values.rice_price_per_kg !== ""
    ) {
      try {
        await axios
          .put(
            `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`,
            values
          )
          .then((result) => {
            console.log(result.data);
          });
        Swal.fire({
          title: "แก้ไขสำเร็จ",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } catch (error) {
        console.log("Error : " + error);
      }
    }
  };
  return (
    <div>
      <button
        type="button"
        className="p-2 rounded-lg bg-pink-400 text-white hover:bg-pink-500"
        onClick={() => setModal(!modal)}
      >
        <FaRegEdit />
      </button>

      {modal ? (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-black bg-opacity-50 flex">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  แก้ไขผลผลิต
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center w-8 h-8"
                  onClick={() => setModal(!modal)}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      ปริมาณข้าวที่ได้ (กิโลกรัม)
                    </label>
                    <input
                      type="number"
                      name="total_yield"
                      id="total_yield"
                      value={values.total_yield}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          total_yield: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                    />
                    {total_yield ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกปริมาณข้าวที่ได้</span>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      น้ำหนักสุทธิ (กิโลกรัม)
                    </label>
                    <input
                      type="number"
                      name="yield"
                      id="yield"
                      value={values.yield}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          yield: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                    {yield_input ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกน้ำหนักสุทธิ</span>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      ราคข้าวต่อกิโลกรัม (บาท)
                    </label>
                    <input
                      type="number"
                      name="rice_price_per_kg"
                      id="rice_price_per_kg"
                      value={values.rice_price_per_kg}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          rice_price_per_kg: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                    {rice_price_per_kg ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกราคาข้าวต่อกิโลกรัม</span>
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      จำนวนเงิน (บาท)
                    </label>
                    <input
                      type="number"
                      name="district"
                      id="district"
                      value={values.yield * values.rice_price_per_kg}
                      disabled
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="text-sm bg-green-600 py-3 px-4 rounded-md text-white hover:bg-green-100 hover:text-green-700 hover:duration-200"
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal(!modal)}
                    className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
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

Edit_Yield.propTypes = {
  riceCaltivation_id: PropTypes.number,
};

export default Edit_Yield;
