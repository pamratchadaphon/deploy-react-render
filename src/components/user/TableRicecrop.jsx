import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { TbClipboardText } from "react-icons/tb";
import axios from "axios";
import PropTypes from "prop-types";
import Pagination from "../../components/user/Pagination";
import dot from "../../images/dot.png";

const TableRicecrop = ({ user_id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/user/riceCaltivation_incomeExpense/${user_id}`
        );
        setData(res.data[0].riceCaltivation);
      } catch (error) {
        console.log("Error" + error);
      }
    };
    fetchData();
  }, [user_id]);

  const formatDate = (string) => {
    const date = new Date(string);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  const [records, setRecords] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);

  return (
    <div>
      <div className="hidden md:flex bg-white p-4 mt-4 shadow rounded-lg mb-4 overflow-x-scroll">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                ลำดับที่
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                ปี
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                วันที่ปลูก
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                วันที่คาดว่าจะเก็บเกี่ยว
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                พันธุ์ข้าว
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                พื้นที่ (ไร่)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                รายงานค่าใช้จ่าย
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                รายงานแปลงนา
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr className="bg-white border-b hover:bg-gray-50 " key={i}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                >
                  {firstIndex + i + 1}
                </th>
                <td className="px-6 py-4 text-center">{d.year}</td>
                <td className="px-6 py-4 text-center">
                  {formatDate(d.startDate)}
                </td>
                <td className="px-6 py-4 text-center">
                  {formatDate(d.endDate)}
                </td>
                <td className="px-6 py-4 text-center">{d.riceVariety}</td>
                <td className="px-6 py-4 text-center">{d.area}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/ricecrop/history/${user_id}/${d.riceCaltivation_id}`}
                    className="flex justify-center items-center"
                  >
                    <div className="hover:bg-orange-400 rounded-md bg-orange-100 text-orange-500 hover:text-white w-8 h-8 flex justify-center items-center border border-orange-200">
                      <TbClipboardText className="w-6 h-6" />
                    </div>
                  </a>
                </td>
                <td className="px-6 py-4 ">
                  <a
                    href={`/ricecrop/detail/${user_id}/${d.riceCaltivation_id}`}
                    className="flex justify-center items-center"
                  >
                    <div className="hover:bg-sky-400 rounded-md bg-sky-100 text-sky-500 hover:text-white w-8 h-8 flex justify-center items-center border border-sky-200">
                      <FaEye className="w-6 h-6" />
                    </div>
                  </a>
                </td>
              </tr>
            ))}
            {data.length === 0 ? (
              <tr>
                <td className="text-center py-4" colSpan="8">
                  กำลังโหลด...
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="md:hidden flex flex-col">
        {records.map((d, i) =>
          i % 3 === 0 ? (
            <div
              className="flex flex-col gap-1  mb-4 p-4 rounded-lg bg-gradient-to-br from-orange-100 to-yellow-100"
              key={i}
            >
              <div className="flex items-center text-sm space-x-1 p-2 bg-white shadow rounded-xl">
                <img src={dot} width={17} />
                <span>ปี</span>
                <span>{d.year}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">วันที่ปลูก</span>
                <span>{formatDate(d.startDate)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">วันที่คาดว่าจะเก็บเกี่ยว</span>
                <span>{formatDate(d.endDate)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">พันธุ์ข้าว</span>
                <span>{d.riceVariety}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">พื้นที่</span>
                <span>{d.area} (ไร่)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm w-1/2 p-2 text-center  bg-gradient-to-r from-red-400 to-pink-400 rounded-l-xl">
                  <a
                    href={`/ricecrop/history/${user_id}/${d.riceCaltivation_id}`}
                    className="flex justify-center items-center text-white focus:underline gap-1"
                  >
                    <TbClipboardText />
                    รายงานค่าใช้จ่าย
                  </a>
                </div>
                <div className="text-sm w-1/2 p-2 text-center bg-gradient-to-r from-sky-400 to-blue-400 rounded-r-xl">
                  <a
                    href={`/ricecrop/detail/${user_id}/${d.riceCaltivation_id}`}
                    className="flex justify-center items-center  text-white focus:underline gap-1"
                  >
                    <FaEye />
                    รายงานแปลงนา
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col gap-1  mb-4 p-4 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100"
              key={i}
            >
              <div className="flex items-center text-sm space-x-1 p-2 bg-white shadow rounded-xl">
                <img src={dot} width={17} />
                <span>ปี</span>
                <span>{d.year}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">วันที่ปลูก</span>
                <span>{formatDate(d.startDate)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">วันที่คาดว่าจะเก็บเกี่ยว</span>
                <span>{formatDate(d.endDate)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">พันธุ์ข้าว</span>
                <span>{d.riceVariety}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">พื้นที่</span>
                <span>{d.area} (ไร่)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm w-1/2 p-2 text-center  bg-gradient-to-r from-red-400 to-pink-400 rounded-l-xl">
                  <a
                    href={`/ricecrop/history/${user_id}/${d.riceCaltivation_id}`}
                    className="flex justify-center items-center text-white focus:underline gap-1"
                  >
                    <TbClipboardText />
                    รายงานค่าใช้จ่าย
                  </a>
                </div>
                <div className="text-sm w-1/2 p-2 text-center bg-gradient-to-r from-sky-400 to-blue-400 rounded-r-xl">
                  <a
                    href={`/ricecrop/detail/${user_id}/${d.riceCaltivation_id}`}
                    className="flex justify-center items-center  text-white focus:underline gap-1"
                  >
                    <FaEye />
                    รายงานแปลงนา
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Pagination
        data={data}
        recodesPerPage={10}
        setFirstIndex={setFirstIndex}
        setRecords={setRecords}
      />
    </div>
  );
};

TableRicecrop.propTypes = {
  user_id: PropTypes.number,
};

export default TableRicecrop;
