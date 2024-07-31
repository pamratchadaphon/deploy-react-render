import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import ViewRiceVariety from "./ViewRiceVariety";
import EditRiceVariety from "./EditRiceVariety";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";

const Table_RiceVariety = ({ search }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://deploy-nodejs-render.onrender.com/riceVariety/");
        const searchName = res.data.filter((data) =>
          data.name.includes(search)
        );
        setData(searchName);
      } catch (error) {
        console.log("Error" + error);
      }
    };
    fetchData();
  }, [search]);

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

  const deleteRiceVariety = async (id, name) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: `คุณต้องการลบพันธุ์ข้าว ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://deploy-nodejs-render.onrender.com/riceVariety/${id}`);
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              รูปภาพ
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2">
                ชื่อพันธุ์
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2 ">
                อายุเก็บเกี่ยว
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2">
                ผลผลิต
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2">
                ความสูง
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center gap-2">
                ความไวแสง
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i} className="bg-white border-b hover:bg-gray-50 ">
              <th
                scope="row"
                className="p-2 font-normal flex justify-center"
              >
                <img
                  src={d.image}
                  className="h-16 w-24"
                />
              </th>
              <th scope="row" className="p-2 font-normal">
                {d.name}
              </th>
              <th scope="row" className="p-2 font-normal">
                {d.age} 
              </th>
              <th scope="row" className="p-2 font-normal">
                ประมาณ {d.yield} กก./ไร่
              </th>
              <th scope="row" className="p-2 font-normal">
                {d.height} ซม.
              </th>
              <th scope="row" className="p-2 font-normal">
                {d.photosensitivity}
              </th>
              <th scope="row" className="p-2 font-normal text-center">
                <div className="flex justify-center items-center gap-2">
                  <ViewRiceVariety id={d.riceVariety_id} />
                  <EditRiceVariety id={d.riceVariety_id} />
                  <button
                    className="flex justify-center items-center"
                    onClick={() => deleteRiceVariety(d.riceVariety_id, d.name)}
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
          pageRangeDisplayed={3}
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

Table_RiceVariety.propTypes = {
  search: PropTypes.string,
};

export default Table_RiceVariety;
