import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoTrashOutline } from "react-icons/io5";
import EditIncome from "./EditIncome";
import EditExpense from "./EditExpense";
import Swal from "sweetalert2";
import { FaSort } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";

const Table_IncomeExpense = ({ search, type }) => {
  const [data, setData] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://deploy-nodejs-render.onrender.com/incomeExpense`);
        const dataAll = res.data.filter(
          (data) =>
            data.riceCaltivation_id !== null &&
            data.user_id !== null &&
            data.user !== null
        );
        const name = search.split(" ");

        if (name.length === 1) {
          setFname(name[0])
        } else {
          setFname(name[0]);
          setLname(name[1]);
        }

        const search_data = dataAll.filter(
          (data) => data.type.includes(type) && data.user.fname.includes(fname) && data.user.lname.includes(lname)
        );
        search_data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
        setData(search_data);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [search, type, fname, lname]);

  const [order, setOrder] = useState("DSC");
  const sortingName = (column) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a.user[column] > b.user[column] ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a.user[column] < b.user[column] ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  const sorting = (column) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[column] > b[column] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[column] < b[column] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };
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

  const handleDelete = async (detail, id) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบ?",
        text: `คุณต้องการลบรายการ ${detail}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ตกลง",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`https://deploy-nodejs-render.onrender.com/incomeExpense/${id}`);
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-center">
                ชื่อชาวนา
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sortingName("fname")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-center">
                รหัสรอบการปลูก
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("riceCaltivation_id")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-start">
                วันที่
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("date")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-start">
                รายการ
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("detail")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-4 py-2">
              <div className="flex items-center gap-2 justify-end">
                ราคา (บาท)
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("price")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50"
              key={i}
            >
              <td className="p-2 text-center">
                {d.user.fname} {d.user.lname}
              </td>
              <td className="p-2 text-center">{d.riceCaltivation_id}</td>
              <th className="p-2 font-normal text-start">
                {new Date(d.date).getDate()}/{new Date(d.date).getMonth() + 1}/
                {new Date(d.date).getFullYear()}
              </th>
              <td className="p-2 text-start">{d.detail}</td>
              <td className="p-2 text-end">{d.price.toLocaleString()}</td>

              <td className="p-2">
                <div className="flex justify-center items-center gap-2">
                  <div className="flex justify-center items-center cursor-pointer">
                    <div className="hover:bg-sky-400 hover:text-white rounded-md bg-sky-100 text-sky-500  w-8 h-8 flex justify-center items-center border border-sky-200">
                      {d.type === "รายจ่าย" ? (
                        <EditExpense
                          income_expense_id={d.income_expense_id}
                          riceCaltivation_id={d.riceCaltivation_id}
                        />
                      ) : (
                        <EditIncome
                          income_expense_id={d.income_expense_id}
                          riceCaltivation_id={d.riceCaltivation_id}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="flex justify-center items-center cursor-pointer"
                    onClick={() => handleDelete(d.detail, d.income_expense_id)}
                  >
                    <div className="hover:bg-red-400 rounded-md bg-red-100 text-red-500 hover:text-white w-8 h-8 flex justify-center items-center border border-red-300">
                      <IoTrashOutline className="w-6 h-6" />
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {records.length === 0 ? (
            <tr>
              <td className="text-center py-4" colSpan="6">
               กำลังโหลด
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

Table_IncomeExpense.propTypes = {
  search: PropTypes.string,
  riceCaltivation_id_search: PropTypes.string,
  type: PropTypes.string,
  fname: PropTypes.string,
  lname: PropTypes.string,
};

export default Table_IncomeExpense;
