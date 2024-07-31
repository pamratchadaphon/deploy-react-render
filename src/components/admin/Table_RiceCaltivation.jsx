import { useEffect, useState } from "react";
import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";
import Edit_RiceCaltivation from "./Edit_RiceCaltivation";
import View_RiceCaltivation from "./View_RiceCaltivation";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { FaSort } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";

const Table_RiceCaltivation = ({ search }) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("DSC");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://deploy-nodejs-render.onrender.com/riceCaltivation");
        const data = res.data.filter((data) => data.user !== null);
        const name = search.split(" ");
        if (name.length === 1) {
          setFname(name[0]);
        } else {
          setFname(name[0]);
          setLname(name[1]);
        }
        const searchName = data.filter(
          (data) =>
            data.user.fname.includes(fname) && data.user.lname.includes(lname)
        );
        setData(searchName.sort((a, b) => a.year - b.year));
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

  const sortingPrice = () => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a.yield * a.rice_price_per_kg > b.yield * b.rice_price_per_kg ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a.yield * a.rice_price_per_kg < b.yield * b.rice_price_per_kg ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  const deleteRiceCaltivation = async (id) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://deploy-nodejs-render.onrender.com/riceCaltivation/${id}`);
        await Swal.fire({
          title: "ลบสำเร็จ",
          icon: "success",
        });
        window.location.reload();
      }
    });
  };

  return (
    <div className="flex flex-col overflow-x-scroll lg:overflow-x-hidden">
      <table className="w-full text-sm  text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                ID
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("riceCaltivation_id")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-center">
                ผู้ปลูก
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sortingName("fname")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                ปี{" "}
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("year")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4 text-start">
              <div className="flex items-center gap-1 justify-start">
                พันธุ์ข้าว
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("riceVariety")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                พื้นที่ (ไร่)
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("area")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                ปริมาณข้าวที่ได้ (กิโลกรัม)
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("total_yield")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                ปริมาณข้าวที่ขาย (กิโลกรัม)
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("yield")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                ราคา/กิโลกรัม (บาท)
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sorting("rice_price_per_kg")}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 justify-end">
                จำนวนเงิน (บาท)
                <button
                  className="text-gray-400 hover:text-gray-700"
                  onClick={() => sortingPrice()}
                >
                  <FaSort />
                </button>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((data, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50 ">
              <th scope="row" className="p-2 font-normal text-gray-900">
                {data.riceCaltivation_id}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {data.user.fname} {data.user.lname}
              </th>
              <th scope="row" className="p-2 font-normal">
                {data.year}
              </th>
              <th scope="row" className="p-2 font-normal text-start">
                {data.riceVariety}
              </th>
              <th scope="row" className="p-2 font-normal text-end">
                {data.area.toLocaleString()}
              </th>
              <th scope="row" className="p-2 font-normal text-end">
                {data.total_yield.toLocaleString()}
              </th>
              <th scope="row" className="p-2 font-normal text-end">
                {data.yield.toLocaleString()}
              </th>
              <th scope="row" className="p-2 font-normal text-end">
                {data.rice_price_per_kg.toLocaleString()}
              </th>
              <th scope="row" className="p-2 font-normal text-end">
                {Math.round(
                  data.yield * data.rice_price_per_kg
                ).toLocaleString()}
              </th>
              <th scope="row" className="p-2 font-normal">
                <div className="flex justify-center items-center gap-2">
                  <View_RiceCaltivation id={data.riceCaltivation_id} />
                  <Edit_RiceCaltivation id={data.riceCaltivation_id} />
                  <button
                    className="flex justify-center items-center"
                    onClick={() =>
                      deleteRiceCaltivation(data.riceCaltivation_id)
                    }
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
              <td className="text-center py-4" colSpan="10">
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

Table_RiceCaltivation.propTypes = {
  search: PropTypes.string,
  fname: PropTypes.string,
  lname: PropTypes.string,
};

export default Table_RiceCaltivation;
