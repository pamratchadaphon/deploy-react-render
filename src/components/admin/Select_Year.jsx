import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Select_Year = ({ setYear }) => {
  const [yearData, setYearData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://deploy-nodejs-render.onrender.com/incomeExpense");
        const data = res.data.filter(
          (data) =>
            data.type === "รายรับ" &&
            data.riceCaltivation_id !== null &&
            data.user_id !== null
        );
        setYearData([
            ...new Set(data.map((data) => new Date(data.date).getFullYear())),
          ].sort((a, b) => b - a))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <select
        name="year"
        id="year"
        className="border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 text-gray-500 hover:bg-gray-100 hover:border-gray-400"
        onChange={(e) => setYear(e.target.value)}
      >
        <option value={(new Date).getFullYear()}>ปี</option>
        {yearData.map((yearData, index) => (
          <option value={yearData} key={index}>{yearData}</option>
        ))}
      </select>
    </div>
  );
};

Select_Year.propTypes = {
  setYear: PropTypes.func,
};

export default Select_Year;
