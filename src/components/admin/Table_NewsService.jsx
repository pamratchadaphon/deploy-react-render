import { useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import Swal from "sweetalert2";
import { IoTrashOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import EditNewService from "./EditNewService";

const Table_NewsService = ({ data }) => {
  const [records, setRecords] = useState([]);

  const deleteNewService = async (id, name) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบ?",
        text: `คุณต้องการลบ ${name}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ตกลง",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`https://deploy-nodejs-render.onrender.com/newsService/${id}`);
          await Swal.fire({
            title: "ลบสำเร็จ",
            icon: "success",
          });
          window.location.reload();
        }
      });
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <div className="flex flex-col overflow-x-scroll">
      <table className="w-full text-sm  text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/4 text-start">
              หัวข้อ
            </th>
            <th scope="col" className="px-6 py-3  w-1/4 ">
              ลิงค์ไปยังข้อมูล
            </th>
            <th scope="col" className="px-6 py-3 text-center w-1/4">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50">
              <th scope="row" className="px-4 py-2 font-normal text-start">
                {d.name}
              </th>
              <th
                scope="row"
                className="p-2 font-normal text-start lg:max-w-4xl"
              >
                <div className="w-96 overflow-x-scroll">
                  <a
                    href={d.content}
                    target="_blank"
                    className="underline text-blue-600"
                  >
                    {d.content}
                  </a>
                </div>
              </th>
              <th scope="row" className="p-2 font-normal">
                <div className="flex justify-center items-center gap-2">
                  <EditNewService id={d.newService_id} />
                  <button
                    className="flex justify-center items-center"
                    onClick={() => deleteNewService(d.newService_id, d.name)}
                  >
                    <div className="hover:bg-red-400 rounded-md bg-red-100 text-red-500 hover:text-white w-8 h-8 flex justify-center items-center border border-red-300">
                      <IoTrashOutline className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </th>
            </tr>
          ))}
          {records.length === 0 ? (
            <tr>
              <td className="text-center py-4" colSpan="8">
                ไม่พบข้อมูล
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <Pagination data={data} setRecords={setRecords} recodesPerPage={4} />
    </div>
  );
};

Table_NewsService.propTypes = {
  data: PropTypes.array,
};

export default Table_NewsService;
