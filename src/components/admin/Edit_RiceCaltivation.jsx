import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Edit_RiceCaltivation = ({ id }) => {
  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    year: 0,
    startDate: "",
    endDate: "",
    riceVariety: "",
    area: 0,
    total_yield: 0,
    yield: 0,
    rice_price_per_kg: 0,
    rice_consumption: 0,
    seed_rice: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/riceCaltivation/${id}`
        );
        const fomatDate = (string) => {
          const date = new Date(string);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${year}-${month < 10 ? "0" + month : month}-${
            day < 10 ? "0" + day : day
          }`;
        };
        setValues({
          ...values,
          year: res.data.year,
          startDate: fomatDate(res.data.startDate),
          endDate: fomatDate(res.data.endDate),
          riceVariety: res.data.riceVariety,
          area: res.data.area,
          total_yield: res.data.total_yield,
          yield: res.data.yield,
          rice_consumption: res.data.rice_consumption,
          rice_price_per_kg: res.data.rice_price_per_kg,
          seed_rice: res.data.seed_rice,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const [year, setYear] = useState(false);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [total_yield, setTotal_yield] = useState(false);
  const [yield_input, setYield_Input] = useState(false);
  const [rice_price_per_kg, setRice_price_per_kg] = useState(false);
  const [area, setArea] = useState(false);
  const [riceVariety, setRiceVariety] = useState(false);

  useEffect(() => setYear(false), [values.year]);
  useEffect(() => setStartDate(false), [values.startDate]);
  useEffect(() => setEndDate(false), [values.endDate]);
  useEffect(() => setTotal_yield(false), [values.total_yield]);
  useEffect(() => setYield_Input(false), [values.yield]);
  useEffect(() => setRice_price_per_kg(false), [values.rice_price_per_kg]);
  useEffect(() => setArea(false), [values.area]);
  useEffect(() => setRiceVariety(false), [values.riceVariety]);

  const check = () => {
    values.year === "" ? setYear(true) : null;
    values.startDate === "" ? setStartDate(true) : null;
    values.endDate === "" ? setEndDate(true) : null;
    values.total_yield === "" ? setTotal_yield(true) : null;
    values.yield === "" ? setYield_Input(true) : null;
    values.rice_price_per_kg === "" ? setRice_price_per_kg(true) : null;
    values.area === "" ? setArea(true) : null;
    values.riceVariety === "" ? setRiceVariety(true) : null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (
      values.year !== "" &&
      values.startDate !== "" &&
      values.endDate !== "" &&
      values.total_yield !== "" &&
      values.yield !== "" &&
      values.rice_price_per_kg !== "" &&
      values.area !== "" &&
      values.riceVariety !== ""
    ) {
      try {
        await axios
          .put(`https://deploy-nodejs-render.onrender.com/riceCaltivation/${id}`, values)
          .then((result) => console.log(result.data));
        Swal.fire({
          title: "แก้ไขสำเร็จ",
          icon: "success",
        }).then((result) => {
          result.isConfirmed ? window.location.reload() : null;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <button
        className="flex justify-center items-center"
        onClick={() => setModal(!modal)}
      >
        <div className="hover:bg-orange-400 rounded-md bg-orange-100 text-orange-500 hover:text-white w-8 h-8 flex justify-center items-center border border-orange-200">
          <FaRegEdit className="w-5 h-5" />
        </div>
      </button>

      {modal ? (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 max-h-full flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  แก้ไขข้อมูลรอบการปลูก
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
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-3 gap-4 text-start">
                    <div>
                      <label
                        htmlFor="year"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        ปี
                      </label>
                      <input
                        type="number"
                        name="year"
                        id="year"
                        value={values.year}
                        onChange={(e) =>
                          setValues({ ...values, year: e.target.value })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full"
                      />
                      {year ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกปี</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="startDate"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        วันที่ปลูก
                      </label>

                      <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={values.startDate}
                        onChange={(e) =>
                          setValues({ ...values, startDate: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {startDate ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกวันที่ปลูก</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="endDate"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        วันที่คาดว่าจะเก็บเกี่ยว
                      </label>

                      <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={values.endDate}
                        onChange={(e) =>
                          setValues({ ...values, endDate: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {endDate ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกวันที่คาดว่าจะเก็บเกี่ยว</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="riceVariety"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        พันธุ์ข้าว
                      </label>

                      <input
                        type="text"
                        name="riceVariety"
                        id="riceVariety"
                        value={values.riceVariety}
                        onChange={(e) =>
                          setValues({ ...values, riceVariety: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {riceVariety ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกพันธุ์ข้าว</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="area"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        พื้นที่ (ไร่)
                      </label>

                      <input
                        type="number"
                        name="area"
                        id="area"
                        value={values.area}
                        onChange={(e) =>
                          setValues({ ...values, area: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {area ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกพื้นที่</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="total_yield"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        ปริมาณข้าวที่ได้ (กิโลกรัม)
                      </label>

                      <input
                        type="number"
                        name="total_yield"
                        id="total_yield"
                        value={values.total_yield}
                        onChange={(e) =>
                          setValues({ ...values, total_yield: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
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
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        ปริมาณข้าวที่ขาย (กิโลกรัม)
                      </label>

                      <input
                        type="number"
                        name="yield"
                        id="yield"
                        value={values.yield}
                        onChange={(e) =>
                          setValues({ ...values, yield: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {yield_input ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกปริมาณข้าวที่ขาย</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="rice_price_per_kg"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        ราคาต่อกิโลกรัม (บาท)
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
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {rice_price_per_kg ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกราคาต่อกิโลกรัม</span>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        จำนวนเงิน (บาท)
                      </label>

                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={values.yield * values.rice_price_per_kg}
                        disabled
                        className="blok bg-gray-200 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="rice_consumption"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        เก็บไว้บริโภค (กิโลกรัม)
                      </label>

                      <input
                        type="number"
                        name="rice_consumption"
                        id="rice_cinsumption"
                        value={values.rice_consumption}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            rice_consumption: e.target.value,
                          })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="seed_rice"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        เก็บไว้ทำเมล็ดพันธุ์ (กิโลกรัม)
                      </label>

                      <input
                        type="number"
                        name="seed_rice"
                        id="seed_rice"
                        value={values.seed_rice}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            seed_rice: e.target.value,
                          })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
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
      ) : null}
    </div>
  );
};

Edit_RiceCaltivation.propTypes = {
  id: PropTypes.number,
};
export default Edit_RiceCaltivation;
