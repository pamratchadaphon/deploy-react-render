import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AddExpense = () => {
  const [modal, setModal] = useState(false);

  const [values, setValues] = useState({
    date: new Date().toISOString().split("T")[0],
    detail: "",
    price: "",
    payee: "",
    type: "รายจ่าย",
    user_id: "",
    riceCaltivation_id: "",
  });

  const [dropdown, setDropdown] = useState(false);
  const [detail_input, setDetail_Input] = useState("");

  const clickDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleDetail = (e) => {
    setValues({ ...values, detail: e.target.value });
    setDropdown(!dropdown);
  };

  const Detail = (string) => {
    setValues({ ...values, detail: string });
    setDropdown(!dropdown);
  };

  const data_labor = [
    "กำจัดวัชพืช",
    "เก็บเกี่ยวข้าว",
    "ฉีดยาคุมหญ้า",
    "ฉีดยาฆ่าแมลง",
    "ฉีดยาป้องกันแมลง",
    "ตัดหญ้า",
    "ปลูกข้าว",
    "หว่านปุ๋ย",
    "หว่านเมล็ดพันธุ์ข้าว",
    "ย่ำนา",
  ];

  const data_chemicals = [
    "จุลินทรีย์ย่อยสลายตอซังข้าว",
    "ปุ๋ยเกล็ด",
    "ปุ๋ยเคมี",
    "ปุ๋ยอินทรีย์",
    "ยาฆ่าหญ้า",
    "ยาคุมหญ้า",
    "ยาฆ่าแมลง",
    "ยาป้องกันแมลง",
  ];

  const data_machinery = [
    "โดรนพ่นยา",
    "รถเกี่ยวข้าว",
    "รถเข็นข้าว",
    "รถไถนา",
    "รถดำนา",
    "รถปั่นนา",
  ];

  const [detail, setDetail] = useState(false);
  const [price, setPrice] = useState(false);
  const [payee, setPayee] = useState(false);
  const [user_id, setUser_id] = useState(false);
  const [riceCaltivation_id, setRiceCaltivation_id] = useState(false);

  const check = () => {
    values.detail === "" ? setDetail(true) : null;
    values.price === "" ? setPrice(true) : null;
    values.payee === "" ? setPayee(true) : null;
    values.user_id === "" ? setUser_id(true) : null;
    values.riceCaltivation_id === "" ? setRiceCaltivation_id(true) : null;
  };

  useEffect(() => setDetail(false), [values.detail]);
  useEffect(() => setPrice(false), [values.price]);
  useEffect(() => setPayee(false), [values.payee]);
  useEffect(() => setUser_id(false), [values.user_id]);
  useEffect(() => setRiceCaltivation_id(false), [values.riceCaltivation_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (
      values.date !== "" &&
      values.detail !== "" &&
      values.payee !== "" &&
      values.price !== ""
    ) {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/user/riceCaltivation_incomeExpense/${values.user_id}`
        );
        if (res.data[0].riceCaltivation.length !== 0) {
          await axios
            .post(`https://deploy-nodejs-render.onrender.com/incomeExpense`, values)
            .then((result) => console.log(result.data));
          Swal.fire({
            title: "บันทึกรายจ่ายสำเร็จ",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
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
        className="bg-red-600 px-3 py-2.5 text-white rounded-lg text-sm hover:bg-red-100 hover:text-red-700 hover:duration-200"
        onClick={() => setModal(!modal)}
      >
        บันทึกรายจ่าย
      </button>

      {modal ? (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 max-h-full flex justify-center items-center bg-black bg-opacity-50 h-screen">
          <div className="relative p-4 w-full max-w-md max-h-full ">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  บันทึกรายจ่าย
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
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      วันที่
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={values.date}
                      required
                      onChange={(e) =>
                        setValues({ ...values, date: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="detail"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      รายการ
                    </label>

                    <button
                      type="button"
                      className="border border-gray-300 rounded-lg p-2.5 text-sm bg-gray-50 w-full text-start flex  items-center justify-between gap-2"
                      onClick={clickDropdown}
                      required
                    >
                      {values.detail === "" ? "เลือกรายการ" : values.detail}
                      <IoIosArrowDown />
                    </button>

                    {dropdown ? (
                      <div className="relative max-w-md max-h-full w-full p-4 border rounded-lg shadow-lg">
                        <div className="text-sm space-y-2">
                          <select
                            name="labor"
                            id="labor"
                            className="w-full hover:bg-gray-100"
                            onChange={handleDetail}
                          >
                            <option value="">แรงงาน</option>
                            {data_labor.map((data, index) => (
                              <option value={data} key={index}>
                                {data}
                              </option>
                            ))}
                          </select>
                          <select
                            name="chemicals"
                            id="chemicals"
                            className="w-full hover:bg-gray-100"
                            onChange={handleDetail}
                          >
                            <option value="">ปุ๋ยและสารเคมี</option>
                            {data_chemicals.map((data, index) => (
                              <option value={data} key={index}>
                                {data}
                              </option>
                            ))}
                          </select>
                          <select
                            name="mechinery"
                            id="mechinery"
                            className="w-full hover:bg-gray-100"
                            onChange={handleDetail}
                          >
                            <option value="">เครื่องจักรและอุปกรณ์</option>
                            {data_machinery.map((data, index) => (
                              <option value={data} key={index}>
                                {data}
                              </option>
                            ))}
                          </select>
                          <select
                            name="fuel"
                            id="fuel"
                            className="w-full hover:bg-gray-100"
                            onChange={handleDetail}
                          >
                            <option value="">น้ำมันเชื้อเพลิง</option>
                            <option value="น้ำมันเชื้อเพลิง">
                              น้ำมันเชื้อเพลิง
                            </option>
                          </select>
                          <select
                            name="land_rent"
                            id="land_rent"
                            className="w-full hover:bg-gray-100"
                            onChange={handleDetail}
                          >
                            <option value="">เช่าที่ดิน</option>
                            <option value="เช่าที่ดิน">เช่าที่ดิน</option>
                          </select>
                          <select
                            name="seed"
                            id="seed"
                            className="w-full hover:bg-gray-100"
                            onChange={handleDetail}
                          >
                            <option value="">เมล็ดพันธุ์ข้าว</option>
                            <option value="เมล็ดพันธุ์ข้าว">
                              เมล็ดพันธุ์ข้าว
                            </option>
                          </select>
                          <div className="flex space-x-1">
                            <input
                              type="text"
                              name="detail"
                              id="detail"
                              value={detail_input}
                              onChange={(e) => setDetail_Input(e.target.value)}
                              placeholder="อื่นๆ"
                              className="blok bg-gray-100 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                            />
                            <button
                              type="button"
                              className="p-2.5 bg-slate-100 rounded-md text-sm border hover:bg-gray-200"
                              onClick={() => Detail(detail_input)}
                            >
                              ตกลง
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {detail ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณาเลือกรายการ</span>
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
                      value={values.price}
                      onChange={(e) =>
                        setValues({ ...values, price: e.target.value })
                      }
                      className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                    />
                    {price ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกจำนวนเงิน</span>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="payee"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      ไปยัง
                    </label>

                    <input
                      type="text"
                      name="payee"
                      id="payee"
                      value={values.payee}
                      onChange={(e) =>
                        setValues({ ...values, payee: e.target.value })
                      }
                      list="list_values"
                      className="block border w-full p-2.5 rounded-lg text-sm border-gray-300 bg-gray-50 text-gray-900"
                    />
                    {payee ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกผู้รับเงิน</span>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="user_id"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      รหัสชาวนา
                    </label>
                    <input
                      type="number"
                      name="user_id"
                      id="user_id"
                      value={values.user_id}
                      onChange={(e) =>
                        setValues({ ...values, user_id: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full"
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
                      className="block text-sm font-medium text-gray-900 mb-2"
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full"
                    />
                    {riceCaltivation_id ? (
                      <div className="text-sm text-red-500 flex items-center gap-1">
                        <RiErrorWarningLine />
                        <span>กรุณากรอกรหัสรอบการปลูก</span>
                      </div>
                    ) : null}
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

export default AddExpense;
