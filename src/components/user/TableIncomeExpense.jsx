import { IoTrashOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import axios from "axios";
import Edit_Expense from "./Edit_Expense";
import Edit_Income from "./Edit_Income";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";

const TableIncomeExpense = ({
  incomeExpense,
  selectMonth,
  riceCaltivation_id,
}) => {
  const formatDate = (string) => {
    const date = new Date(string);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  incomeExpense.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const month = (date) => new Date(date).getMonth() + 1 + "";

  const data = incomeExpense.filter((data) =>
    month(data.date).includes(selectMonth)
  );

  const [page, setPage] = useState(1);
  const recodesPerPage = 5;
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

  const handleDelete = (detail, id) => {
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
        await axios.delete(
          `https://deploy-nodejs-render.onrender.com/incomeExpense/${id}`
        );
        await axios.put(
          `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`,
          {
            total_yield: 0,
            yield: 0,
            rice_price_per_kg: 0,
            rice_consumption: 0,
            seed_rice: 0,
          }
        );
        await Swal.fire({
          title: "ลบสำเร็จ",
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  if (!incomeExpense) {
    return (
      <div className="text-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:flex">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                วันที่
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                รายการ
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                ราคา (บาท)
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                ไปยัง
              </th>
              <th scope="col" className="px-6 py-3 text-center">
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
                <th className="px-6 py-4 text-center font-normal">
                  {formatDate(d.date)}
                </th>
                <td className="px-6 py-4 text-center">{d.detail}</td>
                <td className="px-6 py-4 text-end">
                  {d.price.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  {d.payee === null ? "-" : d.payee}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <div className="flex justify-center items-center cursor-pointer">
                      <div className="hover:bg-sky-400 hover:text-white rounded-md bg-sky-100 text-sky-500  w-8 h-8 flex justify-center items-center border border-sky-200">
                        {d.type === "รายจ่าย" ? (
                          <Edit_Expense
                            income_expense_id={d.income_expense_id}
                            riceCaltivation_id={d.riceCaltivation_id}
                          />
                        ) : (
                          <Edit_Income
                            income_expense_id={d.income_expense_id}
                            riceCaltivation_id={d.riceCaltivation_id}
                          />
                        )}
                      </div>
                    </div>
                    <button
                      className="flex justify-center items-center cursor-pointer"
                      onClick={() =>
                        handleDelete(d.detail, d.income_expense_id)
                      }
                    >
                      <div className="hover:bg-red-400 rounded-md bg-red-100 text-red-500 hover:text-white w-8 h-8 flex justify-center items-center border border-red-300">
                        <IoTrashOutline className="w-6 h-6" />
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 ? (
              <tr>
                <td className="text-center py-4" colSpan="5">
                  ไม่พบข้อมูล
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        <div className="flex flex-col gap-1">
          {records.map((d, i) => (
            <div
              className="flex justify-between items-center text- border p-2 bg-gray-50"
              key={i}
            >
              <div className="flex flex-col w-1/3">
                <span className="text-sm">{d.detail}</span>
                <span className="text-xs text-gray-500">{d.payee}</span>
                <span className="text-xs text-gray-500">
                  {formatDate(d.date)}
                </span>
              </div>

              <div className="flex gap-1 items-center w-24 justify-end">
                {d.type === "รายจ่าย" ? (
                  <span className="text-red-600 font-bold">
                    {d.price.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-green-600 font-bold">
                    {d.price.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-gray-800">บาท</span>
              </div>

              <div className="flex gap-1 w-1/3 justify-end">
                {d.type === "รายจ่าย" ? (
                  <div className="text-sky-400">
                    <Edit_Expense
                      income_expense_id={d.income_expense_id}
                      riceCaltivation_id={d.riceCaltivation_id}
                    />
                  </div>
                ) : (
                  <div className="text-sky-400">
                    <Edit_Income
                      income_expense_id={d.income_expense_id}
                      riceCaltivation_id={d.riceCaltivation_id}
                    />
                  </div>
                )}
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => handleDelete(d.detail, d.income_expense_id)}
                >
                  <IoTrashOutline className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </div>
          ))}
          {records.length === 0 ? (
            <span className="text-center">ไม่พบข้อมูล</span>
          ) : null}
        </div>
      </div>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
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

TableIncomeExpense.propTypes = {
  incomeExpense: PropTypes.array,
  selectMonth: PropTypes.string,
  riceCaltivation_id: PropTypes.string,
};

export default TableIncomeExpense;
