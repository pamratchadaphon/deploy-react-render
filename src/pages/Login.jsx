import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ReactTyped } from "react-typed";
import { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const Login = () => {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const check = () => {
    values.email === "" ? setEmail(true) : null;
    values.password === "" ? setPassword(true) : null;
  };

  useEffect(() => setEmail(false), [values.email]);
  useEffect(() => setPassword(false), [values.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    check();

    if (values.email !== "" && values.password !== "") {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://deploy-nodejs-render.onrender.com/user/login",
          values
        );
        const id = response.data.user_id;
        if (response.data.role === "admin") {
          localStorage.setItem("token", response.data.token);
          navigator(`/admin/dashboard`);
        } else {
          localStorage.setItem("token", response.data.token);
          navigator(`/user/home/${id}`);
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.response.data.error === "Incorrect password") {
          Swal.fire({
            title: "รหัสผ่านไม่ถูกต้อง",
            icon: "error",
          });
        } else if (error.response.data.error === "User not found") {
          Swal.fire({
            title: "ยังไม่มีบัญชี",
            text: "กรุณาสร้างบัญชีก่อนลงชื่อเข้าใช้",
            icon: "error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-green-50 to-sky-50">
      <div className="w-full flex flex-col md:flex-row items-center">
        <div className="w-full h-1/3 flex items-center justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-500 md:text-5xl lg:text-6xl">
            <ReactTyped
              strings={[
                "จดบันทึกการปลูกข้าว",
                "ตรวจสอบผลผลิต",
                "เลือกพันธุ์ข้าว",
                "ดูรายงานแปลงนา",
                "ดูรายงานค่าใช้จ่าย",
              ]}
              typeSpeed={100}
              loop
              backSpeed={50}
              showCursor={false}
            />
          </h1>
        </div>
        <div className="w-full flex justify-center items-center bg-white h-screen">
          <div className="flex flex-col p-6 md:p-4 w-full md:w-2/3 h-96 justify-center">
            {isLoading ? (
              <div className="p-4 mb-8 text-sm text-blue-800 rounded-lg bg-blue-50 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="font-medium ml-3">กำลังเข้าสู่ระบบ...</span>
              </div>
            ) : null}
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              ลงชื่อเข้าใช้
            </h3>
            <form
              className="space-y-10 flex flex-col justify-start"
              onSubmit={handleSubmit}
            >
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
              <button
                type="submit"
                className="w-full md:w-full px-5 py-2.5 text-base font-medium text-center text-white bg-green-600 hover:bg-green-100 hover:text-green-700 hover:duration-500 rounded-full flex items-center justify-center gap-2 shadow"
              >
                <span>เข้าใช้งาน</span>
                <GoArrowRight />
              </button>
            </form>
            <div className="flex justify-end items-center pt-4">
              <div className="text-sm font-medium text-gray-900 flex space-x-2">
                <div>ยังไม่มีบัญชี? </div>
                <a
                  href="/register"
                  className="text-blue-600 hover:underline cursor:pointer animate-bounce"
                >
                  สร้างบัญชี
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
