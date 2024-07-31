import PorpTypes from "prop-types";

const BoxIncomeExpense = ({ sumExpense, sumIncome }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className=" bg-gradient-to-br from-red-300 to-rose-200 rounded-lg  p-4 w-full md:w-60  flex items-center justify-between shadow-md">
        <div className="flex flex-col">
          <span className="text-gray-700">รายจ่าย</span>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold ">
              {sumExpense.toLocaleString()}
            </span>
            <span className="text-gray-700">บาท</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className="bg-gradient-to-br from-green-300 to-green-200 p-4 rounded-lg w-full md:w-60 flex items-center justify-between shadow-md">
        <div className="flex flex-col">
          <span className="text-gray-700">รายรับ</span>
          <div className="flex items-center space-x-2">
            <span className="text-xl  font-semibold ">
              {sumIncome.toLocaleString()}
            </span>
            <span className="text-gray-700">บาท</span>
          </div>
        </div>
        <div></div>
      </div>
      <div className=" bg-gradient-to-br from-slate-300 to-zinc-200 p-4 rounded-lg w-full md:w-60  flex justify-between items-center shadow-md">
        <div className="flex flex-col">
          <span className="text-gray-800">คงเหลือ</span>
          <div className="flex items-center space-x-2">
            <span className="text-xl  font-semibold ">
              {(sumIncome - sumExpense).toLocaleString()}
            </span>
            <span className="text-gray-800">บาท</span>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

BoxIncomeExpense.propTypes = {
  sumExpense: PorpTypes.number,
  sumIncome: PorpTypes.number,
};

export default BoxIncomeExpense;
