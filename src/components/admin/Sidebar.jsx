import { TbLogout2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSeedling } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { LuNewspaper } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ page, showSidebar_Moble, setShowSideBar_Moble }) => {
  const navigator = useNavigate();
  const [dashboard, setDashboard] = useState(false);
  const [riceVariety, setRiceVariety] = useState(false);
  const [user, setUser] = useState(false);
  const [riceCaltivaion, setRiceCalrivation] = useState(false);
  const [incomeExpense, setIncomeExpense] = useState(false);
  const [newsService, setNewsService] = useState(false);

  useEffect(() => {
    page === "riceVariety" ? setRiceVariety(true) : null;
    page === "user" ? setUser(true) : null;
    page === "riceCaltivation" ? setRiceCalrivation(true) : null;
    page === "dashboard" ? setDashboard(true) : null;
    page === "newsService" ? setNewsService(true) : null;
    page === "incomeExpense" ? setIncomeExpense(true) : null;
  }, [page]);

  const Logout = () => {
    localStorage.removeItem("token");
    navigator("/");
  };

  return (
    <div>
      <div className="hidden lg:flex fixed top-0 left-0 z-40 w-1/6 border-r h-screen px-5 bg-white flex-col justify-between">
        <div>
          <div className="text-center py-7">
            <a
              href="/admin/dashboard"
              className="text-green-700 font-bold text-2xl"
            >
              Admin
            </a>
          </div>
          <div className="flex flex-col">
            <nav>
              <ul className="space-y-4 text-sm">
                {dashboard ? (
                  <li className="text-gray-500 rounded-lg p-2 bg-gray-100">
                    <a
                      href="/admin/dashboard"
                      className="flex items-center gap-2 text-gray-500"
                    >
                      <RxDashboard />
                      <span> Dashboard </span>
                    </a>
                  </li>
                ) : (
                  <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                    <a
                      href="/admin/dashboard"
                      className="flex items-center gap-2 text-gray-500"
                    >
                      <RxDashboard />
                      <span> Dashboard </span>
                    </a>
                  </li>
                )}

                {user ? (
                  <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                    <a href="#" className="flex items-center gap-2">
                      <IoMdPerson />
                      จัดการชาวนา
                    </a>
                  </li>
                ) : (
                  <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                    <a href="/admin/user" className="flex items-center gap-2">
                      <IoMdPerson />
                      จัดการชาวนา
                    </a>
                  </li>
                )}

                {riceCaltivaion ? (
                  <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                    <a
                      href="/admin/riceCaltivaion"
                      className="flex items-center gap-2"
                    >
                      <FaRegFileAlt />
                      จัดการรอบการปลูก
                    </a>
                  </li>
                ) : (
                  <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                    <a
                      href="/admin/riceCaltivaion"
                      className="flex items-center gap-2"
                    >
                      <FaRegFileAlt />
                      จัดการรอบการปลูก
                    </a>
                  </li>
                )}

                {incomeExpense ? (
                  <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                    <a
                      href="/admin/incomeExpense"
                      className="flex items-center gap-2"
                    >
                      <FaRegMoneyBillAlt />
                      จัดการรายรับรายจ่าย
                    </a>
                  </li>
                ) : (
                  <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                    <a
                      href="/admin/incomeExpense"
                      className="flex items-center gap-2"
                    >
                      <FaRegMoneyBillAlt />
                      จัดการรายรับรายจ่าย
                    </a>
                  </li>
                )}

                {riceVariety ? (
                  <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                    <a
                      href="/admin/riceVariety"
                      className="flex items-center gap-2"
                    >
                      <FaSeedling />
                      จัดการพันธุ์ข้าว
                    </a>
                  </li>
                ) : (
                  <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                    <a
                      href="/admin/riceVariety"
                      className="flex items-center gap-2"
                    >
                      <FaSeedling />
                      จัดการพันธุ์ข้าว
                    </a>
                  </li>
                )}

                {newsService ? (
                  <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                    <a
                      href="/admin/newsService"
                      className="flex items-center gap-2"
                    >
                      <LuNewspaper />
                      จัดการบริการข่าวสาร
                    </a>
                  </li>
                ) : (
                  <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                    <a
                      href="/admin/newsService"
                      className="flex items-center gap-2"
                    >
                      <LuNewspaper />
                      จัดการบริการข่าวสาร
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <button
          type="button"
          className="hover:bg-gray-100 mb-10 p-2 rounded-lg"
          onClick={Logout}
        >
          <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-800 justify-center">
            <TbLogout2 />
            <span className="text-sm">ออกจากระบบ</span>
          </div>
        </button>
      </div>

      {showSidebar_Moble ? (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  w-full md:inset-0 max-h-full flex justify-center items-center bg-black bg-opacity-50 h-screen lg:hidden">
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 left-0 z-50 border-r h-full px-5 bg-white flex flex-col justify-between w-2/3 md:w-1/3"
          >
            <div>
              <div className="text-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowSideBar_Moble(!showSidebar_Moble)}
                  className="border-2 p-1 rounded-lg text-gray-500"
                >
                  <IoMdClose className="w-5 h-5" />
                </button>
              </div>
              <div className="text-center pb-7">
                <a
                  href="/admin/dashboard"
                  className="text-green-700 font-bold text-2xl"
                >
                  Admin
                </a>
              </div>
              <div className="flex flex-col">
                <nav>
                  <ul className="space-y-4 text-sm">
                    {dashboard ? (
                      <li className="text-gray-500 rounded-lg p-2 bg-gray-100">
                        <a
                          href="/admin/dashboard"
                          className="flex items-center gap-2 text-gray-500"
                        >
                          <RxDashboard />
                          <span> Dashboard </span>
                        </a>
                      </li>
                    ) : (
                      <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                        <a
                          href="/admin/dashboard"
                          className="flex items-center gap-2 text-gray-500"
                        >
                          <RxDashboard />
                          <span> Dashboard </span>
                        </a>
                      </li>
                    )}
                    {user ? (
                      <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                        <a href="#" className="flex items-center gap-2">
                          <IoMdPerson />
                          จัดการชาวนา
                        </a>
                      </li>
                    ) : (
                      <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                        <a
                          href="/admin/user"
                          className="flex items-center gap-2"
                        >
                          <IoMdPerson />
                          จัดการชาวนา
                        </a>
                      </li>
                    )}
                    {riceCaltivaion ? (
                      <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                        <a
                          href="/admin/riceCaltivaion"
                          className="flex items-center gap-2"
                        >
                          <FaRegFileAlt />
                          จัดการรอบการปลูก
                        </a>
                      </li>
                    ) : (
                      <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                        <a
                          href="/admin/riceCaltivaion"
                          className="flex items-center gap-2"
                        >
                          <FaRegFileAlt />
                          จัดการรอบการปลูก
                        </a>
                      </li>
                    )}
                    {incomeExpense ? (
                      <li className="text-gray-500 rounded-lg p-2 bg-gray-100">
                        <a
                          href="/admin/incomeExpense"
                          className="flex items-center gap-2"
                        >
                          <FaRegMoneyBillAlt />
                          จัดการรายรับรายจ่าย
                        </a>
                      </li>
                    ) : (
                      <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                        <a
                          href="/admin/incomeExpense"
                          className="flex items-center gap-2"
                        >
                          <FaRegMoneyBillAlt />
                          จัดการรายรับรายจ่าย
                        </a>
                      </li>
                    )}
                    {riceVariety ? (
                      <li className="text-gray-500 rounded-lg p-2  bg-gray-100">
                        <a
                          href="/admin/riceVariety"
                          className="flex items-center gap-2"
                        >
                          <FaSeedling />
                          จัดการพันธุ์ข้าว
                        </a>
                      </li>
                    ) : (
                      <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                        <a
                          href="/admin/riceVariety"
                          className="flex items-center gap-2"
                        >
                          <FaSeedling />
                          จัดการพันธุ์ข้าว
                        </a>
                      </li>
                    )}
                    {newsService ? (
                      <li className="text-gray-500 rounded-lg p-2 bg-gray-100">
                        <a
                          href="/admin/newsService"
                          className="flex items-center gap-2"
                        >
                          <LuNewspaper />
                          จัดการบริการข่าวสาร
                        </a>
                      </li>
                    ) : (
                      <li className="text-gray-500 rounded-lg p-2 hover:bg-gray-100">
                        <a
                          href="/admin/newsService"
                          className="flex items-center gap-2"
                        >
                          <LuNewspaper />
                          จัดการบริการข่าวสาร
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
            <button
              type="button"
              className="hover:bg-gray-100 mb-10 p-2 rounded-lg"
              onClick={Logout}
            >
              <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-800 justify-center">
                <TbLogout2 />
                <span className="text-sm">ออกจากระบบ</span>
              </div>
            </button>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};

Sidebar.propTypes = {
  page: PropTypes.string,
  showSidebar_Moble: PropTypes.bool,
  setShowSideBar_Moble: PropTypes.func,
};

export default Sidebar;
