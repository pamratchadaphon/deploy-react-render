import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const EditUser = ({ id }) => {
  const [modal, setModal] = useState();
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: "",
    subdistrict: "",
    district: "",
    province: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://deploy-nodejs-render.onrender.com/user/${id}`);
        setValues({
          ...values,
          fname: res.data.fname,
          lname: res.data.lname,
          email: res.data.email,
          password: res.data.password,
          phone: res.data.phone,
          subdistrict: res.data.subdistrict,
          district: res.data.district,
          province: res.data.province,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const [fname, setFirstName] = useState(false);
  const [lname, setLastname] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [phone, setPhone] = useState(false);
  const [subdistrict, setSubdistrict] = useState(false);
  const [diatrict, setDistrict] = useState(false);
  const [province, setProvince] = useState(false);

  const check = () => {
    values.fname === "" ? setFirstName(true) : null;
    values.lname === "" ? setLastname(true) : null;
    values.email === "" ? setEmail(true) : null;
    values.password === "" ? setPassword(true) : null;
    values.phone === "" ? setPhone(true) : null;
    values.subdistrict === "" ? setSubdistrict(true) : null;
    values.district === "" ? setDistrict(true) : null;
    values.province === "" ? setProvince(true) : null;
  };

  useEffect(() => setFirstName(false), [values.fname]);
  useEffect(() => setLastname(false), [values.lname]);
  useEffect(() => setEmail(false), [values.email]);
  useEffect(() => setPassword(false), [values.password]);
  useEffect(() => setSubdistrict(false), [values.subdistrict]);
  useEffect(() => setDistrict(false), [values.district]);
  useEffect(() => setProvince(false), [values.province]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (
      values.fname !== "" &&
      values.lname !== "" &&
      values.email !== "" &&
      values.password !== "" &&
      values.phone !== "" &&
      values.subdistrict !== "" &&
      values.district !== "" &&
      values.province !== ""
    ) {
      try {
        await axios
          .put(`https://deploy-nodejs-render.onrender.com/user/${id}`, values)
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
          <div className="relative p-4 w-full max-w-md max-h-full ">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  แก้ไขข้อมูลชาวนา
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fname"
                        className="block text-sm font-medium text-gray-900 mb-2"
                      >
                        ชื่อ
                      </label>
                      <input
                        type="text"
                        name="fname"
                        id="fname"
                        value={values.fname}
                        onChange={(e) =>
                          setValues({ ...values, fname: e.target.value })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 block w-full"
                      />
                      {fname ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกชื่อ</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="lname"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        นามสกุล
                      </label>

                      <input
                        type="text"
                        name="lname"
                        id="lname"
                        value={values.lname}
                        onChange={(e) =>
                          setValues({ ...values, lname: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {lname ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกนามสกุล</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        อีเมล
                      </label>

                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={values.email}
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {email ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกอีเมล</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        รหัสผ่าน
                      </label>

                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {password ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกรหัสผ่าน</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        เบอร์โทรศัพท์
                      </label>

                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={"0" + values.phone}
                        onChange={(e) =>
                          setValues({ ...values, phone: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {phone ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกเบอร์โทรศัพท์</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="subdistrict"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        ตำบล
                      </label>

                      <input
                        type="text"
                        name="subdistrict"
                        id="subdistrict"
                        value={values.subdistrict}
                        onChange={(e) =>
                          setValues({ ...values, subdistrict: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {subdistrict ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกตำบล</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="district"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        อำเภอ
                      </label>

                      <input
                        type="text"
                        name="district"
                        id="district"
                        value={values.district}
                        onChange={(e) =>
                          setValues({ ...values, district: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {diatrict ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกอำเภอ</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="province"
                        className="text-sm text-gray-900 font-medium block mb-2"
                      >
                        จังหวัด
                      </label>

                      <input
                        type="text"
                        name="province"
                        id="province"
                        value={values.province}
                        onChange={(e) =>
                          setValues({ ...values, province: e.target.value })
                        }
                        className="blok bg-gray-50 border border-gray-300 rounded-lg text-gray-900 p-2.5 text-sm w-full"
                      />
                      {province ? (
                        <div className="text-sm text-red-500 flex items-center gap-1">
                          <RiErrorWarningLine />
                          <span>กรุณากรอกจังหวัด</span>
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
      ) : null}
    </div>
  );
};

EditUser.propTypes = {
  id: PropTypes.number,
};

export default EditUser;
