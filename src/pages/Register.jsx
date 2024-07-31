import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Register = () => {
  const navigator = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    phone: "",
    subdistrict: "",
    district: "",
    province: "",
    role: "user",
  });

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [fname, setFname] = useState(false);
  const [lname, setLname] = useState(false);
  const [phone, setPhone] = useState(false);
  const [subdistrict, setSubdistrict] = useState(false);
  const [district, setDistrict] = useState(false);
  const [province, setProvince] = useState(false);

  const check = () => {
    values.email === "" ? setEmail(true) : null;
    values.password === "" ? setPassword(true) : null;
    values.fname === "" ? setFname(true) : null;
    values.lname === "" ? setLname(true) : null;
    values.phone === "" ? setPhone(true) : null;
    values.subdistrict === "" ? setSubdistrict(true) : null;
    values.district === "" ? setDistrict(true) : null;
    values.province === "" ? setProvince(true) : null;
  };

  useEffect(() => setEmail(false), [values.email]);
  useEffect(() => setPassword(false), [values.password]);
  useEffect(() => setFname(false), [values.fname]);
  useEffect(() => setLname(false), [values.lname]);
  useEffect(() => setPhone(false), [values.phone]);
  useEffect(() => setSubdistrict(false), [values.subdistrict]);
  useEffect(() => setDistrict(false), [values.district]);
  useEffect(() => setProvince(false), [values.province]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();
    if (
      values.email !== "" &&
      values.password !== "" &&
      values.fname !== "" &&
      values.lname !== "" &&
      values.phone !== "" &&
      values.subdistrict !== "" &&
      values.district !== "" &&
      values.province !== ""
    ) {
      try {
        await axios
          .post("https://deploy-nodejs-render.onrender.com/user", values)
          .then((result) => console.log(result.data));
        await Swal.fire({
          title: "ลงทะเบียนสำเร็จ",
          icon: "success",
        });
        navigator("/");
      } catch (error) {
        console.log(error);
        if (error.response.data.error.name === "SequelizeUniqueConstraintError") {
          Swal.fire({
            title: "อีเมลนี้ถูกใช้แล้ว",
            text: "กรุณาใช้อีเมลใหม่ในการสร้างบัญชี",
            icon: "error",
          });
        } else if (error.response.data.error.name === "SequelizeDatabaseError") {
          Swal.fire({
            title: "เบอร์โทรศัพท์ไม่ถูกต้อง",
            text: "กรุณาระบุหมายเลขโทรศัพท์ที่มีความยาว 10 หลัก",
            icon: "error",
          });
        }
      }
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const provinces = [
    "กรุงเทพมหานคร",
    "กระบี่",
    "กาญจนบุรี",
    "กาฬสินธุ์",
    "กำแพงเพชร",
    "ขอนแก่น",
    "จันทบุรี",
    "ฉะเชิงเทรา",
    "ชลบุรี",
    "ชัยนาท",
    "ชัยภูมิ",
    "ชุมพร",
    "เชียงราย",
    "เชียงใหม่",
    "ตรัง",
    "ตราด",
    "ตาก",
    "นครนายก",
    "นครปฐม",
    "นครพนม",
    "นครราชสีมา",
    "นครศรีธรรมราช",
    "นครสวรรค์",
    "นนทบุรี",
    "นราธิวาส",
    "น่าน",
    "บึงกาฬ",
    "บุรีรัมย์",
    "ปทุมธานี",
    "ประจวบคีรีขันธ์",
    "ปราจีนบุรี",
    "ปัตตานี",
    "พระนครศรีอยุธยา",
    "พังงา",
    "พัทลุง",
    "พิจิตร",
    "พิษณุโลก",
    "เพชรบุรี",
    "เพชรบูรณ์",
    "แพร่",
    "พะเยา",
    "ภูเก็ต",
    "มหาสารคาม",
    "มุกดาหาร",
    "แม่ฮ่องสอน",
    "ยโสธร",
    "ยะลา",
    "ร้อยเอ็ด",
    "ระนอง",
    "ระยอง",
    "ราชบุรี",
    "ลพบุรี",
    "ลำปาง",
    "ลำพูน",
    "เลย",
    "ศรีสะเกษ",
    "สกลนคร",
    "สงขลา",
    "สตูล",
    "สมุทรปราการ",
    "สมุทรสงคราม",
    "สมุทรสาคร",
    "สระแก้ว",
    "สระบุรี",
    "สิงห์บุรี",
    "สุโขทัย",
    "สุพรรณบุรี",
    "สุราษฎร์ธานี",
    "สุรินทร์",
    "หนองคาย",
    "หนองบัวลำภู",
    "อ่างทอง",
    "อุดรธานี",
    "อุทัยธานี",
    "อุตรดิตถ์",
    "อุบลราชธานี",
    "อำนาจเจริญ",
  ];

  const clickSelectProvince = (province) => {
    setValues({ ...values, province: province });
    setDropdown(!dropdown);
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-green-50 to-sky-50">
      <div className="w-full flex flex-col lg:flex-row items-center">
        <div className="w-full h-1/3 flex items-center justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-500 md:text-5xl lg:text-6xl">
            <ReactTyped
              strings={[
                "จดบันทึกการปลูกข้าว",
                "ตรวจสอบผลผลิต",
                "เลือกพันธุ์ข้าว",
              ]}
              typeSpeed={100}
              loop
              backSpeed={50}
              showCursor={false}
            />
          </h1>
        </div>
        <div className="w-full flex justify-center items-center bg-white h-screen">
          <div className="flex flex-col p-6 md:p-4 w-screen md:w-2/3 h-96 justify-center">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              สร้างบัญชี
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full block w-full p-2.5 hover:border-green-700 hover:border-2"
                  />
                  {email ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกอีเมล</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  />
                  {password ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกรหัสผ่าน</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  />
                  {fname ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกชื่อ</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  />
                  {lname ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span> กรุณากรอกนามสกุล</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={(e) =>
                      setValues({ ...values, phone: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  />
                  {phone ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกเบอร์โทรศัพท์</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  />
                  {subdistrict ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกตำบล</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  />
                  {district ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกอำเภอ</span>
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    จังหวัด
                  </label>
                  <button
                    type="button"
                    onClick={() => setDropdown(!dropdown)}
                    className="inline-flex items-center justify-between bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full hover:border-green-700 hover:border-2 w-full p-2.5"
                  >
                    {values.province === "" ? "เลือกจังหวัด" : values.province}{" "}
                    {dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </button>
                  {dropdown ? (
                    <div className="bg-white divide-y divide-gray-100 rounded-lg shadow">
                      <ul className="py-2 text-sm text-gray-700 overflow-y-scroll h-44 w-full">
                        {provinces.map((province, index) => (
                          <li
                            className="block px-4 py-2 hover:bg-gray-100 cursor-default"
                            onClick={() => clickSelectProvince(province)}
                            key={index}
                          >
                            {province}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {province ? (
                    <div className="text-sm text-red-500 flex items-center gap-1">
                      <RiErrorWarningLine />
                      <span>กรุณากรอกจังหวัด</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="w-full md:w-full px-5 py-2.5 text-base font-medium text-center text-white bg-green-600 hover:bg-green-100 hover:text-green-700 hover:duration-500 rounded-full flex items-center justify-center gap-2 shadow mt-4"
              >
                <span>สร้างบัญชี</span>
                <GoArrowRight />
              </button>
            </form>
            <div className="flex justify-end items-center pt-4">
              <div className="text-sm font-medium text-gray-900 flex space-x-2">
                <div>หากมีบัญชีอยู่แล้ว</div>
                <a
                  href="/"
                  className="text-blue-600 hover:underline cursor:pointer animate-bounce"
                >
                  ลงชื่อเข้าใช้
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
