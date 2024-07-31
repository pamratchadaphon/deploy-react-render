import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import axios from "axios";
import EditUser from "./EditUser";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";
import { FaSort } from "react-icons/fa";

const Table_Users = ({ search }) => {
  const [data, setData] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://deploy-nodejs-render.onrender.com/user`);
        const user = res.data.filter((data) => data.role === "user");
        const name = search.split(" ");
        if (name.length === 1) {
          setFname(name[0]);
        } else {
          setFname(name[0]);
          setLname(name[1]);
        }
        const searchName = user.filter(
          (data) => data.fname.includes(fname) && data.lname.includes(lname)
        );
        setData(searchName);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [search, fname, lname]);

  const [page, setPage] = useState(1);
  const recodesPerPage = 10;
  const lastIndex = page * recodesPerPage;
  const firstIndex = lastIndex - recodesPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recodesPerPage);
  const [lastRow, setLastRow] = useState(0);

  const nextPage = () => {
    page < npage ? setPage(page + 1) : null;
  };

  const prePage = () => {
    page > 1 ? setPage(page - 1) : null;
  };

  const changePage = (even) => {
    setPage(even.selected + 1);
  };

  useEffect(() => {
    if (records.length > 0) {
      setLastRow(firstIndex + records.length);
    }
  }, [firstIndex, records]);

  const [order, setOrder] = useState("DSC");

  const sorting = (column) => {
    if (order === "ASC") {
      const sorted = data.sort((a, b) => (a[column] > b[column] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = data.sort((a, b) => (a[column] < b[column] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  const deleteUser = async (id, fname, lname) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบ?",
        text: `คุณต้องการลบ ${fname} ${lname}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ตกลง",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`https://deploy-nodejs-render.onrender.com/user/${id}`);
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
    <div className="flex flex-col overflow-x-scroll lg:overflow-x-hidden">
      <table className="w-full text-sm  text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-2 py-4 text-start">
              <div className="flex items-center gap-2 justify-center">
                ID
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("user_id")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              ชื่อ
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              นามสกุล
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              อีเมล
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              เบอร์โทรศัพท์
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              ตำบล
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              อำเภอ
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              จังหวัด
            </th>
            <th scope="col" className="px-2 py-4">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50 ">
              <th
                scope="row"
                className="p-2 font-normal text-center text-gray-900"
              >
                {d.user_id}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {d.fname}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {d.lname}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {d.email}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                0{d.phone}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {d.subdistrict}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {d.district}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {d.province}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                <div className="flex justify-center items-center gap-2">
                  <EditUser id={d.user_id} />
                  <button
                    className="flex justify-center items-center"
                    onClick={() => deleteUser(d.user_id, d.fname, d.lname)}
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
                กำลังโหลด...
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 w-full"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          จำนวนแถวต่อหน้า{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {firstIndex + 1}-{lastRow}
          </span>{" "}
          จาก{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {data.length}
          </span>
        </span>
        <ReactPaginate
          breakLabel={
            <span className="w-8 h-8 hover:bg-green-100 rounded-lg flex justify-center items-center hover:text-green-700">
              ...
            </span>
          }
          nextLabel={
            page < npage ? (
              <span
                className="p-2 flex justify-center items-center bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={nextPage}
              >
                <GrNext />
              </span>
            ) : null
          }
          onPageChange={changePage}
          pageRangeDisplayed={5}
          pageCount={npage}
          previousLabel={
            firstIndex > 0 ? (
              <span
                className="p-2 flex justify-center items-center bg-gray-100 rounded-lg hover:bg-gray-200"
                onClick={prePage}
              >
                <GrPrevious />
              </span>
            ) : null
          }
          renderOnZeroPageCount={null}
          containerClassName="flex space-x-1 justify-center items-center"
          pageClassName="w-8 h-8 hover:bg-green-100 hover:text-green-700 rounded-lg flex items-center justify-center"
          activeClassName="bg-green-100 text-green-700"
        />
      </nav>
    </div>
  );
};

Table_Users.propTypes = {
  search: PropTypes.string,
  clear: PropTypes.bool,
};

export default Table_Users;
