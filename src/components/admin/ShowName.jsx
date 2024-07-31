import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table_RiceCaltivation from "../../components/admin/Table_RiceCaltivation";
import Table_IncomeExpense from "./Table_IncomeExpense";
import SelectType from "./SelectType";

const ShowName = ({ search, page, riceCaltivation_id_search }) => {
  const [name, setName] = useState([]);
  const [fname, setFirstName] = useState("");
  const [lname, setLastname] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://deploy-nodejs-render.onrender.com/riceCaltivation");
        const data = res.data.filter((data) => data.user !== null);
        const nameAll = [];
        data.filter((data) =>
          data.user.fname === search
            ? nameAll.push(`${data.user.fname}  ${data.user.lname}`)
            : null
        );
        setName([...new Set(nameAll)]);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [search]);

  const clickName = (fullname) => {
    const name = fullname.split(" ");
    setFirstName(name[0]);
    setLastname(name[2]);
  };

  return (
    <div className="flex flex-col">
      <div>
        {name.length > 0 && fname.length === 0 && lname.length === 0 ? (
          <div>
            {page === "riceCaltivation" ? (
              <span className="text-sm lg:text-lg">
                กรุณาใช้เมาส์ Click ที่ชื่อเพื่อแสดงข้อมูลรอบการปลูก
              </span>
            ) : (
              <span className="text-sm lg:text-lg">
                กรุณาใช้เมาส์ Click ที่ชื่อเพื่อแสดงข้อมูลรายรับรายจ่าย
              </span>
            )}
            <table>
              <tbody className="text-sm lg:text-lg">
                {name.map((name, index) => (
                  <tr key={index}>
                    <td className="w-5">{index + 1}</td>
                    <td
                      className="text-blue-800 hover:text-blue-900 cursor-pointer"
                      onClick={() => clickName(name)}
                    >
                      {name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            {name.length === 0 ? (
              <h1 className="text-red-500">
                ไม่พบชื่อชาวนา กรุณาระบุใหม่อีกครั้ง
              </h1>
            ) : (
              <div>
                {page === "riceCaltivation" ? (
                  <div>
                    {/* <h1 className="pb-4 text-sm lg:text-md">
                      รอบการปลูกของ {fname} {lname}
                    </h1> */}
                    <Table_RiceCaltivation fname={fname} lname={lname} />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 pb-4">
                      {/* <h1 className="text-sm lg:text-md">
                        รายรายรับรายจ่ายของ {fname} {lname} รหัสรอบการปลูกที่{" "}
                        {riceCaltivation_id_search}
                      </h1> */}
                      <SelectType setType={setType} />
                    </div>
                    <Table_IncomeExpense
                      fname={fname}
                      lname={lname}
                      search={search}
                      riceCaltivation_id_search={riceCaltivation_id_search}
                      type={type}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ShowName.propTypes = {
  search: PropTypes.string,
  page: PropTypes.string,
  riceCaltivation_id_search: PropTypes.string,
};

export default ShowName;
