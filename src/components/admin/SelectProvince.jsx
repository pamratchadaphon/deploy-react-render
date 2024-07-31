import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SelectProvince = ({ setProvince, year }) => {
  const [province_res, setProvince_res] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://deploy-nodejs-render.onrender.com/incomeExpense");
        const data = res.data.filter(
          (data) =>
            data.type === "รายรับ" &&
            new Date(data.date).getFullYear() === year &&
            data.user !== null &&
            data.riceCaltivation !== null 
        );
        const province = [...new Set(data.map((data) => data.user.province))];
        province.sort((a, b) => (a > b ? 1 : -1));
        setProvince_res(province);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [year]);

  return (
    <div>
      <select
        name="province"
        id="province"
        className="border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-400"
        onChange={(e) => setProvince(e.target.value)}
      >
        <option value="">จังหวัด</option>
        {province_res.map((province, index) => (
          <option value={province} key={index}>
            {province}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectProvince.propTypes = {
  setProvince: PropTypes.func,
  year: PropTypes.number
};

export default SelectProvince;
