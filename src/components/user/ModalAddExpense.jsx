import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { PropTypes } from "prop-types";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";
import { motion } from "framer-motion";

const ModalAddExpense = ({
  showModalExpense,
  handleModalExpense,
  user_id,
  riceCaltivation_id,
}) => {
  const [values, setValues] = useState({
    date: new Date().toISOString().split("T")[0],
    detail: "",
    price: "",
    payee: "",
    type: "รายจ่าย",
    user_id,
    riceCaltivation_id: riceCaltivation_id,
  });
  const [dropdown, setDropdown] = useState(false);
  const [payees, setPayees] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/riceCaltivation/incomeExpense/${riceCaltivation_id}`
        );
        const incomeExpense = res.data[0].incomeExpense;

        const payee = [];
        incomeExpense.map((data) =>
          data.type === "รายจ่าย" ? payee.push(data.payee) : null
        );
        setPayees([...new Set(payee)]);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [riceCaltivation_id]);

  useEffect(() => {
    setValues({ ...values, riceCaltivation_id: riceCaltivation_id });
  }, [riceCaltivation_id]);

  const [detail, setDetail] = useState(false);
  const [price, setPrice] = useState(false);
  const [payee, setPayee] = useState(false);

  const check = () => {
    values.detail === "" ? setDetail(true) : setDetail(false);
    values.price === "" ? setPrice(true) : setPrice(false);
    values.payee === "" ? setPayee(true) : setPayee(false);
  };

  useEffect(() => setDetail(false), [values.detail]);
  useEffect(() => setPrice(false), [values.price]);
  useEffect(() => setPayee(false), [values.payee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (
      values.date !== "" &&
      values.detail !== "" &&
      values.payee !== "" &&
      values.price !== ""
    ) {
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
    }
  };
  return (
    <div>
      {showModalExpense ? (
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
                  onClick={handleModalExpense}
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
                      {dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>

                    {dropdown ? (
                      <div className="relative  max-w-md max-h-full w-full p-4 border rounded-lg shadow-lg">
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

                    <datalist
                      id="list_values"
                      onChange={(e) =>
                        setValues({ ...values, payee: e.target.value })
                      }
                    >
                      {payees.map((p, i) => (
                        <option value={p} key={i}>
                          {p}
                        </option>
                      ))}
                    </datalist>
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
                      onClick={handleModalExpense}
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

ModalAddExpense.propTypes = {
  showModalExpense: PropTypes.bool,
  handleModalExpense: PropTypes.func,
  user_id: PropTypes.number,
  riceCaltivation_id: PropTypes.number,
};

export default ModalAddExpense;
