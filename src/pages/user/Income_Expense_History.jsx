import Navbar from "../../components/user/Navbar";
import TableIncomeExpense from "../../components/user/TableIncomeExpense";
import BoxIncomeExpense from "../../components/user/BoxIncomeExpense";
import ModalAddExpense from "../../components/user/ModalAddExpense";
import { useEffect, useState } from "react";
import ModalAddIncome from "../../components/user/ModalAddIncome";
import { useParams } from "react-router-dom";
import axios from "axios";
import IncomeExpensePerMonth from "../../components/user/IncomeExpensePerMonth";
import SelectMonth from "../../components/user/SelectMonth";
import Cetegory_Expense from "../../components/user/Cetegory_Expense";
import { motion } from "framer-motion";
import Bg_header from "../../components/user/Bg_header";

const Income_Expense_History = () => {
  const { riceCaltivation_id, user_id } = useParams();
  const idRiceCaltivation = Number(riceCaltivation_id);
  const idUser = Number(user_id);

  const [showModalExpense, setShowModalExpense] = useState(false);
  const [showModalIncome, setShowModalIncome] = useState(false);

  const handleModalExpense = () => setShowModalExpense(!showModalExpense);
  const handleModalIncome = () => setShowModalIncome(!showModalIncome);

  const [incomeExpense, setIncomeExpense] = useState([]);
  const [riceCaltivation, setRiceCaltivation] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://deploy-nodejs-render.onrender.com/riceCaltivation/incomeExpense/${idRiceCaltivation}`
        );
        setIncomeExpense(res.data[0].incomeExpense);
        setRiceCaltivation(res.data[0]);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, [idRiceCaltivation]);

  const expense = incomeExpense.filter((data) => data.type.includes("รายจ่าย"));
  const income = incomeExpense.filter((data) => data.type.includes("รายรับ"));

  const sumExpense = expense.reduce((total, data) => total + data.price, 0);
  const sumIncome = income.reduce((total, data) => total + data.price, 0);

  const [selectMonth, setSelectMonth] = useState("");

  const handleMonth = (month) => setSelectMonth(month);

  const [startMonth_IncomeExpense, setStartMonth_IncomeExpense] = useState(0);
  const [endMonth_IncomeExpense, setEndMonth_IncomeExpense] = useState(0);

  useEffect(() => {
    if (incomeExpense != "") {
      const month = (string) => {
        return new Date(string).getMonth() + 1;
      };
      setStartMonth_IncomeExpense(month(incomeExpense[0].date));
      setEndMonth_IncomeExpense(
        month(incomeExpense[incomeExpense.length - 1].date)
      );
    }
  }, [incomeExpense]);

  return (
    <div>
      <Navbar id={idUser} />
      <Bg_header text={"รายงานค่าใช้จ่าย"} />
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
        }}
        className="mx-auto max-w-screen-xl p-4"
      >
        <BoxIncomeExpense sumExpense={sumExpense} sumIncome={sumIncome} />
        <div className="flex flex-col md:flex-row gap-4 my-4">
          <IncomeExpensePerMonth
            incomeExpense={incomeExpense}
            startMonth_IncomeExpense={startMonth_IncomeExpense}
            endMonth_IncomeExpense={endMonth_IncomeExpense}
          />
          <Cetegory_Expense incomeExpense={incomeExpense} />
        </div>

        <div className="bg-white p-4 my-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex gap-2">
              <div>
                <button
                  type="button"
                  className="bg-red-600 px-4 py-2 text-white rounded-lg text-sm hover:bg-red-100 hover:text-red-700 hover:duration-200 shadow-lg"
                  onClick={handleModalExpense}
                >
                  บันทึกรายจ่าย
                </button>
                <ModalAddExpense
                  showModalExpense={showModalExpense}
                  handleModalExpense={handleModalExpense}
                  user_id={idUser}
                  riceCaltivation_id={idRiceCaltivation}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="bg-green-600 px-4 py-2 text-white rounded-lg text-sm hover:bg-green-100 hover:text-green-700 hover:duration-200 shadow-lg"
                  onClick={handleModalIncome}
                >
                  บันทึกรายรับ
                </button>
                <ModalAddIncome
                  showModalIncome={showModalIncome}
                  handleModalIncome={handleModalIncome}
                  user_id={idUser}
                  riceCaltivation_id={idRiceCaltivation}
                />
              </div>
            </div>
            <div>
              <SelectMonth
                riceCaltivation={riceCaltivation}
                handleMonth={handleMonth}
                startMonth_IncomeExpense={startMonth_IncomeExpense}
                endMonth_IncomeExpense={endMonth_IncomeExpense}
              />
            </div>
          </div>
          <div>
            <TableIncomeExpense
              incomeExpense={incomeExpense}
              selectMonth={selectMonth}
              riceCaltivation_id={riceCaltivation_id}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Income_Expense_History;
