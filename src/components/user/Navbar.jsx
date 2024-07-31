import { useEffect, useRef, useState } from "react";
import { RiPlantLine } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { FaSeedling } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ id, page }) => {
  const user_id = Number(id);
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const navigate = useNavigate();
  const [hoveredHome, setHoveredHome] = useState(false);
  const [hoveredRicecrop, setHoveredRicecrop] = useState(false);
  const [hoveredRiceVariety, setHoverRicetyVariety] = useState(false);
  const ref = useRef(null);
  const [home, setHome] = useState(false);
  const [riceCaltivation, setRiceCaltivation] = useState(false);
  const [riceVariety, setRiceVaricety] = useState(false);

  useEffect(() => {
    page === "home" ? setHome(true) : null;
    page === "riceCaltivation" ? setRiceCaltivation(true) : null;
    page === "riceVariety" ? setRiceVaricety(true) : null;
  }, [page]);

  const toggleMenu = () => {
    setIsOpenToggle(!isOpenToggle);
  };

  const iconToggle = () => {
    if (!isOpenToggle) {
      return <AiOutlineMenu className="w-20 h-20" />;
    } else {
      return <IoMdClose className="w-20 h-20" />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b w-full border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-4">
        <a href={`/user/home/${user_id}`} className="flex items-center">
          <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap text-green-800">
            RiceProsper
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-green-800 bg-green-200 hover:bg-green-600 hover:text-white rounded-full focus:ring-4 focus:outline-none focus:ring-green-300 font-medium text-sm px-4 py-2 text-cente hover:duration-500"
            onClick={handleLogout}
          >
            ออกจากระบบ
          </button>

          <button
            type="button"
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onClick={toggleMenu}
          >
            {iconToggle()}
          </button>
        </div>
        <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1">
          <ul className="md:flex md:p-0 mt-4 font-medium md:space-x-8 md:flex-row md:mt-0 ">
            <li>
              {home ? (
                <a
                  href={`/user/home/${user_id}`}
                  className=" rounded-xl text-green-900 md:p-0 flex items-center"
                >
                  <div className="bg-green-100 w-32 h-10 flex items-center justify-center rounded-full">
                    <div
                      style={{
                        width: ref.current?.offsetWidth,
                      }}
                    >
                      <div ref={ref} className="pr-4">
                        <FaHome />
                      </div>
                    </div>
                    <span className="pl-2">หน้าแรก</span>
                  </div>
                </a>
              ) : (
                <a
                  href={`/user/home/${user_id}`}
                  className=" md:hover:rounded-xl md:hover:text-green-900 md:p-0 flex items-center"
                  onMouseEnter={() => setHoveredHome(true)}
                  onMouseLeave={() => setHoveredHome(false)}
                >
                  <div className="hover:bg-green-100 w-32 h-10 flex items-center justify-center rounded-full">
                    <div
                      style={{
                        width: hoveredHome ? ref.current?.offsetWidth || 0 : 0,
                      }}
                      className="overflow-x-hidden duration-150 ease-in"
                    >
                      <div ref={ref} className="pr-4">
                        <FaHome />
                      </div>
                    </div>
                    <span className="pl-2">หน้าแรก</span>
                  </div>
                </a>
              )}
            </li>
            <li>
              {riceCaltivation ? (
                <a
                  href={`/ricecrop/${user_id}`}
                  className="rounded-xl text-green-900 md:p-0 flex items-center"
                >
                  <div className="bg-green-100 w-32 h-10 inline-flex items-center justify-center rounded-full">
                    <div
                      style={{
                        width: ref.current?.offsetWidth,
                      }}
                    >
                      <div ref={ref} className="pr-4">
                        <FaSeedling />
                      </div>
                    </div>
                    <span className="pl-2">รอบการปลูก</span>
                  </div>
                </a>
              ) : (
                <a
                  href={`/ricecrop/${user_id}`}
                  className=" md:hover:rounded-xl  md:hover:text-green-900 md:p-0 flex items-center"
                  aria-current="page"
                  onMouseEnter={() => setHoveredRicecrop(true)}
                  onMouseLeave={() => setHoveredRicecrop(false)}
                >
                  <div className="hover:bg-green-100 w-32 h-10 inline-flex items-center justify-center rounded-full">
                    <div
                      style={{
                        width: hoveredRicecrop
                          ? ref.current?.offsetWidth || 0
                          : 0,
                      }}
                      className="overflow-x-hidden duration-150 ease-in"
                    >
                      <div ref={ref} className="pr-4">
                        <FaSeedling />
                      </div>
                    </div>
                    <span className="pl-2">รอบการปลูก</span>
                  </div>
                </a>
              )}
            </li>
            <li>
              {riceVariety ? (
                <a
                  href={`/ricevariety/${user_id}`}
                  className="rounded-xl text-green-900 md:p-0 flex items-center"
                >
                  <div className="w-32 h-10 inline-flex items-center justify-center rounded-full bg-green-100">
                    <div
                      style={{
                        width: ref.current?.offsetWidth,
                      }}
                    >
                      <div ref={ref} className="pr-4">
                        <RiPlantLine />
                      </div>
                    </div>
                    <span className="pl-2">พันธุ์ข้าว</span>
                  </div>
                </a>
              ) : (
                <a
                  href={`/ricevariety/${user_id}`}
                  className=" md:hover:rounded-xl  md:hover:text-green-900 md:p-0 flex items-center"
                  onMouseEnter={() => setHoverRicetyVariety(true)}
                  onMouseLeave={() => setHoverRicetyVariety(false)}
                >
                  <div className="w-32 h-10 inline-flex items-center justify-center rounded-full hover:bg-green-100">
                    <div
                      style={{
                        width: hoveredRiceVariety
                          ? ref.current?.offsetWidth || 0
                          : 0,
                      }}
                      className="overflow-x-hidden duration-150 ease-in"
                    >
                      <div ref={ref} className="pr-4">
                        <RiPlantLine />
                      </div>
                    </div>
                    <span className="pl-2">พันธุ์ข้าว</span>
                  </div>
                </a>
              )}
            </li>
          </ul>
        </div>
        {isOpenToggle ? (
          <ul className="fixed top-14 right-0 left-0 z-50 md:hidden flex flex-col p-4 mt-4 rounded-b-lg shadow font-medium border-b border-gray-300 bg-white rtl:space-x-reverse w-full">
            <li>
              {home ? (
                <a
                  href={`/user/home/${user_id}`}
                  className="block py-2 px-3 text-white rounded bg-green-500"
                >
                  หน้าแรก
                </a>
              ) : (
                <a
                  href={`/user/home/${user_id}`}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-green-700 md:p-0 "
                >
                  หน้าแรก
                </a>
              )}
            </li>
            <li>
              {riceCaltivation ? (
                <a
                  href={`/ricecrop/${user_id}`}
                  className="block py-2 px-3 text-white rounded bg-green-500"
                >
                  รอบการปลูก
                </a>
              ) : (
                <a
                  href={`/ricecrop/${user_id}`}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-green-700 md:p-0 "
                >
                  รอบการปลูก
                </a>
              )}
            </li>
            <li>
              {riceVariety ? (
                <a
                  href={`/ricevariety/${user_id}`}
                  className="block py-2 px-3 text-white rounded bg-green-500"
                >
                  พันธุ์ข้าว
                </a>
              ) : (
                <a
                  href={`/ricevariety/${user_id}`}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:text-green-700 md:p-0 "
                >
                  พันธุ์ข้าว
                </a>
              )}
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  id: PropTypes.number,
  page: PropTypes.string,
};

export default Navbar;
