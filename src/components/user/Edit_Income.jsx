import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const Edit_Income = ({ income_expense_id, riceCaltivation_id }) => {
  const [values, setValues] = useState({
    date: "",
    detail: "",
    price: "",
  });

  const [yield_rice, setYield] = useState({
    total_yield: 0,
    yield: 0,
    rice_price_per_kg: 0,
    rice_consumption: 0,
    seed_rice: 0,
  });

  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      const resIncome = await axios.get(
        `https://deploy-nodejs-render.onrender.com/incomeExpense/${income_expense_id}`
      );
      const resYield = await axios.get(
        `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`
      );
      const date = new Date(resIncome.data.date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formatDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
      }`;
      setYield({
        ...yield_rice,
        total_yield: resYield.data.total_yield,
        yield: resYield.data.yield,
        rice_price_per_kg: resYield.data.rice_price_per_kg,
        rice_consumption: resYield.data.rice_consumption,
        seed_rice: resYield.data.seed_rice,
      });
      setValues({
        ...values,
        date: formatDate,
        detail: resIncome.data.detail,
        price: resIncome.data.price,
      });
    };
    fetchData();
  }, [income_expense_id, riceCaltivation_id]);

  useEffect(() => {
    setValues({
      ...values,
      price: Number(yield_rice.yield) * Number(yield_rice.rice_price_per_kg),
    });
  }, [yield_rice.yield, yield_rice.rice_price_per_kg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://deploy-nodejs-render.onrender.com/incomeExpense/${income_expense_id}`,
      values
    );
    await axios.put(
      `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`,
      yield_rice
    );
    Swal.fire({
      title: "แก้ไขรายรับสำเร็จ",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <button
        className="flex justify-center items-center w-8 h-8"
        onClick={handleModal}
      >
        <FaRegEdit className="w-5 h-5" />
      </button>

      {modal ? (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-lg max-h-full">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  แก้ไขรายรับ
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={handleModal}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        วันที่
                      </label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={values.date}
                        onChange={(e) =>
                          setValues({ ...values, date: e.target.value })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        รายการ
                      </label>
                      <input
                        type="text"
                        name="detail"
                        id="detail"
                        value={values.detail}
                        disabled
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        ปริมาณข้าวที่ได้ (กิโลกรัม)
                      </label>
                      <input
                        type="number"
                        name="yield_rice"
                        id="yield_rice"
                        value={yield_rice.total_yield}
                        onChange={(e) =>
                          setYield({
                            ...yield_rice,
                            total_yield: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        น้ำหนักสุทธิ (กิโลกรัม)
                      </label>
                      <input
                        type="number"
                        name="yield_rice"
                        id="yield_rice"
                        value={yield_rice.yield}
                        onChange={(e) =>
                          setYield({ ...yield_rice, yield: e.target.value })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        ราคา/กิโลกรัม
                      </label>
                      <input
                        type="number"
                        name="rice_price_per_kg"
                        id="rice_price_per_kg"
                        value={yield_rice.rice_price_per_kg}
                        onChange={(e) =>
                          setYield({
                            ...yield_rice,
                            rice_price_per_kg: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        จำนวนเงิน (บาท)
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={values.price}
                        disabled
                        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        เก็บไว้บริโภค (กิโลกรัม)
                      </label>
                      <input
                        type="number"
                        name="rice_consumption"
                        id="rice_consumption"
                        value={yield_rice.rice_consumption}
                        onChange={(e) =>
                          setYield({
                            ...yield_rice,
                            rice_consumption: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        เก็บไว้ทำเมล็ดพันธ์ุ (กิโลกรัม)
                      </label>
                      <input
                        type="number"
                        name="seed_rice"
                        id="seed_rice"
                        value={yield_rice.seed_rice}
                        onChange={(e) =>
                          setYield({
                            ...yield_rice,
                            seed_rice: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                      />
                    </div>
                  </div>
                  <div className="space-x-2 flex justify-end items-center">
                    <button
                      type="submit"
                      className="text-sm bg-green-600 py-3 px-4 rounded-md text-white hover:bg-green-100 hover:text-green-700 hover:duration-200"
                    >
                      บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={handleModal}
                      className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100 text-gray-900"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Edit_Income.propTypes = {
  edit_Income: PropTypes.bool,
  handleModalIncome: PropTypes.func,
  income_expense_id: PropTypes.number,
  riceCaltivation_id: PropTypes.number,
};

export default Edit_Income;
