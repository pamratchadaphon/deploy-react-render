import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AddIncome = () => {
  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    date: new Date().toISOString().split("T")[0],
    detail: "เกี่ยวข้าว",
    price: "",
    type: "รายรับ",
    user_id: "",
    riceCaltivation_id: "",
  });
  const [yield_rice, setYield] = useState({
    total_yield: "",
    yield: "",
    rice_price_per_kg: "",
    rice_consumption: "",
    seed_rice: "",
  });

  useEffect(
    () =>
      setValues({
        ...values,
        price: Math.round(
          Number(yield_rice.yield) * Number(yield_rice.rice_price_per_kg)
        ),
      }),
    [yield_rice.yield, yield_rice.rice_price_per_kg]
  );

  const [total_yield, setTotal_yield] = useState(false);
  const [yield_input, setYield_Input] = useState(false);
  const [rice_price_per_kg, setRice_price_per_kg] = useState(false);
  const [user_id, setUser_id] = useState(false);
  const [riceCaltivation_id, setRiceCaltivation_id] = useState(false);

  useEffect(() => setTotal_yield(false), [yield_rice.total_yield]);
  useEffect(() => setYield_Input(false), [yield_rice.yield]);
  useEffect(() => setRice_price_per_kg(false), [yield_rice.rice_price_per_kg]);
  useEffect(() => setUser_id(false), [values.user_id]);
  useEffect(() => setRiceCaltivation_id(false), [values.riceCaltivation_id]);

  const check = () => {
    yield_rice.total_yield === "" ? setTotal_yield(true) : null;
    yield_rice.yield === "" ? setYield_Input(true) : null;
    yield_rice.rice_price_per_kg === "" ? setRice_price_per_kg(true) : null;
    values.user_id === "" ? setUser_id(true) : null;
    values.riceCaltivation_id === "" ? setRiceCaltivation_id(true) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    const data_yield = {
      total_yield: yield_rice.total_yield,
      yield: yield_rice.yield,
      rice_price_per_kg: yield_rice.rice_price_per_kg,
      seed_rice: yield_rice.seed_rice === "" ? 0 : yield_rice.seed_rice,
      rice_consumption:
        yield_rice.rice_consumption === "" ? 0 : yield_rice.rice_consumption,
    };
    if (
      yield_rice.total_yield !== "" &&
      yield_rice.yield !== "" &&
      yield_rice.rice_price_per_kg !== "" &&
      values.user_id !== "" &&
      values.riceCaltivation_id !== ""
    ) {
      try {
        const res = await axios.get(
          `user/riceCaltivation_incomeExpense/${Number(
            values.user_id
          )}`
        );
        if (res.data[0].riceCaltivation.length !== 0) {
          if (
            Number(yield_rice.yield) +
              Number(yield_rice.rice_consumption) +
              Number(yield_rice.seed_rice) ===
            Number(yield_rice.total_yield)
          ) {
            await axios
              .post(`incomeExpense`, values)
              .then((result) => console.log(result.data));
            await axios
              .put(
                `https://deploy-nodejs-render.onrender.com/riceCaltivation/${Number(
                  values.riceCaltivation_id
                )}`,
                data_yield
              )
              .then((result) => console.log(result.data));
            Swal.fire({
              title: "บันทึกรายรับสำเร็จ",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else if (
            Number(yield_rice.yield) +
              Number(yield_rice.rice_consumption) +
              Number(yield_rice.seed_rice) <
            Number(yield_rice.total_yield)
          ) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "กรอกปริมาณข้าวน้อยกว่าข้าวที่ได้",
              icon: "error",
            });
          } else if (
            Number(yield_rice.yield) +
              Number(yield_rice.rice_consumption) +
              Number(yield_rice.seed_rice) >
            Number(yield_rice.total_yield)
          ) {
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "กรอกปริมาณข้าวมากกว่าข้าวที่ได้",
              icon: "error",
            });
          }
          console.log(yield_rice);
        } else {
          Swal.fire({
            title: "ชาวนายังไม่ได้สร้างรอบการปลูก",
            icon: "error",
          });
        }
      } catch (error) {
        console.log(error);
        if (
          error.response.data.error.name ===
            "SequelizeForeignKeyConstraintError" &&
          error.response.data.error.fields[0] === "riceCaltivation_id"
        ) {
          Swal.fire({
            title: "ไม่พบรหัสรอบการปลูก",
            icon: "error",
          });
        }
        if (
          error.response.data.error.name ===
            "SequelizeForeignKeyConstraintError" &&
          error.response.data.error.fields[0] === "user_id"
        ) {
          Swal.fire({
            title: "ไม่พบรหัสชาวนา",
            icon: "error",
          });
        }
      }
    }
  };
  return (
    <div>
      <button
        type="button"
        className="bg-green-600 px-3 py-2.5 text-white rounded-lg text-sm hover:bg-green-100 hover:text-green-700 hover:duration-200"
        onClick={() => setModal(!modal)}
      >
        บันทึกรายรับ
      </button>

      {modal ? (
        <div>
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
                    บันทึกรายรับ
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8 ms-auto inline-flex justify-center items-center"
                    onClick={() => setModal(!modal)}
                  >
                    <IoMdClose className="w-10 h-10" />
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex flex-col">
                        <label
                          htmlFor="date"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
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
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="datail"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          รายการ
                        </label>
                        <input
                          type="text"
                          name="detail"
                          id="detail"
                          disabled
                          value={values.detail}
                          className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="total_yield"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          ปริมาณข้าวที่ได้ (กิโลกรัม)
                        </label>

                        <input
                          type="number"
                          name="total_yield"
                          id="total_yield"
                          value={yield_rice.total_yield}
                          onChange={(e) =>
                            setYield({
                              ...yield_rice,
                              total_yield: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        />
                        {total_yield ? (
                          <div className="text-sm text-red-500 flex items-center gap-1">
                            <RiErrorWarningLine />
                            <span>กรุณากรอกปริมาณข้าวที่ได้</span>
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="yield"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          ปริมาณข้าวที่ขาย (กิโลกรัม)
                        </label>

                        <input
                          type="number"
                          name="yield"
                          id="yield"
                          value={yield_rice.yield}
                          onChange={(e) =>
                            setYield({ ...yield_rice, yield: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                        />
                        {yield_input ? (
                          <div className="text-sm text-red-500 flex items-center gap-1">
                            <RiErrorWarningLine />
                            <span>กรุณากรอกน้ำหนักสุทธิ</span>
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="rice_price_per_kg"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          ราคา/กิโลกรัม (บาท)
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
                        />
                        {rice_price_per_kg ? (
                          <div className="text-sm text-red-500 flex items-center gap-1">
                            <RiErrorWarningLine />
                            <span>กรุณากรอกราคา/กิโลกรัม</span>
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          จำนวนเงิน (บาท)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={values.price}
                          disabled
                          className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="rice_consumption"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
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
                        <label
                          htmlFor="seed_rice"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
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
                      <div>
                        <label
                          htmlFor="user_id"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          รหัสชาวนา
                        </label>
                        <input
                          type="number"
                          name="user_id"
                          id="user_id"
                          value={values.user_id}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              user_id: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        />
                        {user_id ? (
                          <div className="text-sm text-red-500 flex items-center gap-1">
                            <RiErrorWarningLine />
                            <span>กรุณากรอกรหัสชาวนา</span>
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label
                          htmlFor="riceCaltivation_id"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          รหัสรอบการปลูก
                        </label>
                        <input
                          type="number"
                          name="riceCaltivation_id"
                          id="riceCaltivation_id"
                          value={values.riceCaltivation_id}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              riceCaltivation_id: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                        />
                        {riceCaltivation_id ? (
                          <div className="text-sm text-red-500 flex items-center gap-1">
                            <RiErrorWarningLine />
                            <span>กรุณากรอกรหัสรอบการปลูก</span>
                          </div>
                        ) : null}
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
                        onClick={() => setModal(!modal)}
                        className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AddIncome;
