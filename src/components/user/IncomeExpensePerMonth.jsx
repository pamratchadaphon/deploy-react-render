import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const IncomeExpensePerMonth = ({
  incomeExpense,
  startMonth_IncomeExpense,
  endMonth_IncomeExpense,
}) => {
  const priceExpense = Array.from({ length: 12 }, () => 0);
  const priceIncome = Array.from({ length: 12 }, () => 0);

  const arrMonthIncome = [];
  const arrMonthExpense = [];
  const arrPriceIncome = [];
  const arrPriceExpense = [];

  for (let i = 0; i < incomeExpense.length; i++) {
    if (incomeExpense[i].type === "รายจ่าย") {
      arrMonthExpense[i] = new Date(incomeExpense[i].date).getMonth() + 1;
      arrPriceExpense[i] = incomeExpense[i].price;
    } else {
      arrMonthIncome[i] = new Date(incomeExpense[i].date).getMonth() + 1;
      arrPriceIncome[i] = incomeExpense[i].price;
    }
  }

  for (let i = 0; i < arrMonthExpense.length; i++) {
    priceExpense[arrMonthExpense[i] - 1] += arrPriceExpense[i];
  }

  for (let i = 0; i < arrMonthIncome.length; i++) {
    priceIncome[arrMonthIncome[i] - 1] += arrPriceIncome[i];
  }

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

  const dataset = [];
  for (let i = startMonth_IncomeExpense - 1; i < endMonth_IncomeExpense; i++) {
    const monthData = {
      expense: priceExpense[i] || 0,
      income: priceIncome[i] || 0,
      month: monthString[i],
    };
    dataset.push(monthData);
  }

  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: dataset.map((data) => data.month),
        datasets: [
          {
            label: "รายจ่าย",
            data: dataset.map((data) => data.expense),
            backgroundColor: ["#FF9997"],
          },
          {
            label: "รายรับ",
            data: dataset.map((data) => data.income),
            backgroundColor: ["#92CEA8"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `จำนวนเงิน : ${tooltipItem.raw.toLocaleString()} บาท`;
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [dataset]);

  if (!dataset) {
    <div className="text-center">
      <p>กำลังโหลด...</p>;
    </div>;
  }

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4 md:w-2/3 shadow-md">
      <div className="border-b pb-4">
        <span>กราฟแสดงการเปรียบเทียบรายรับและรายจ่าย</span>
      </div>{" "}
      <div className="flex flex-col justify-center w-full max-w-3xl mx-auto">
        <div className="h-64 sm:h-80 lg:h-96">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

IncomeExpensePerMonth.propTypes = {
  incomeExpense: PropTypes.array,
  startMonth_IncomeExpense: PropTypes.number,
  endMonth_IncomeExpense: PropTypes.number,
};

export default IncomeExpensePerMonth;
