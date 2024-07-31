import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

const SelectMonth = ({ handleMonth, startMonth_IncomeExpense, endMonth_IncomeExpense}) => {

  const [month, setMonth] = useState("");

  const monthArr = [];
  const monthString = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  for (let i = startMonth_IncomeExpense - 1; i < endMonth_IncomeExpense; i++) {
    for (let j = 0; j < monthString.length; j++) {
      if (i === j) {
        monthArr[i + 1] = monthString[j];
      }
    }
  }

  useEffect(() => {
    handleMonth(month)
  }, [month, handleMonth])

  return (
    <div>
      <form className="max-w-sm mx-auto">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hover:bg-gray-100 hover:border-gray-400"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">เดือน</option>
          {monthArr.map((month, index) => (
            <option value={index} key={index}>
              {month}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

SelectMonth.propTypes = {
    handleMonth: PropTypes.func,
    startMonth_IncomeExpense: PropTypes.number,
    endMonth_IncomeExpense: PropTypes.number
}

export default SelectMonth;
