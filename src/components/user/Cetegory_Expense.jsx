import { useEffect, useRef } from "react";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

Chart.register(PieController, ArcElement, Tooltip, Legend);

const Cetegory_Expense = ({ incomeExpense }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const expense = [];
    incomeExpense.map((data) =>
      data.type === "รายจ่าย" ? expense.push(data) : null
    );
    const value = Array.from({ length: 7 }, () => 0);

    for (let i = 0; i < expense.length; i++) {
      if (
        expense[i].detail === "กำจัดวัชพืช" ||
        expense[i].detail === "เก็บเกี่ยวข้าว" ||
        expense[i].detail === "ฉีดยาคุมหญ้า" ||
        expense[i].detail === "ฉีดยาฆ่าแมลง" ||
        expense[i].detail === "ฉีดยาป้องกันแมลง" ||
        expense[i].detail === "ตัดหญ้า" ||
        expense[i].detail === "ปลูกข้าว" ||
        expense[i].detail === "หว่านปุ๋ย" ||
        expense[i].detail === "หว่านเมล็ดพันธุ์ข้าว" ||
        expense[i].detail === "ย่ำนา"
      ) {
        value[0] += expense[i].price;
      } else if (
        expense[i].detail === "จุลินทรีย์ย่อยสลายตอซังข้าว" ||
        expense[i].detail === "ปุ๋ยเกล็ด" ||
        expense[i].detail === "ปุ๋ยเคมี" ||
        expense[i].detail === "ปุ๋ยอินทรีย์" ||
        expense[i].detail === "ยาฆ่าหญ้า" ||
        expense[i].detail === "ยาคุมหญ้า" ||
        expense[i].detail === "ยาฆ่าแมลง" ||
        expense[i].detail === "ยาป้องกันแมลง"
      ) {
        value[1] += expense[i].price;
      } else if (
        expense[i].detail === "โดรนพ่นยา" ||
        expense[i].detail === "รถเกี่ยวข้าว" ||
        expense[i].detail === "รถเข็นข้าว" ||
        expense[i].detail === "รถไถนา" ||
        expense[i].detail === "รถดำนา" ||
        expense[i].detail === "รถปั่นนา"
      ) {
        value[2] += expense[i].price;
      } else if (expense[i].detail === "น้ำมันเชื้อเพลิง") {
        value[3] += expense[i].price;
      } else if (expense[i].detail === "เช่าที่ดิน") {
        value[4] += expense[i].price;
      } else if (expense[i].detail === "เมล็ดพันธุ์ข้าว") {
        value[5] += expense[i].price;
      } else {
        value[6] += expense[i].price;
      }
    }
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "แรงงาน",
          "ปุ๋ยและสารเคมี",
          "เครื่องจักรและอุปกรณ์",
          "น้ำมันเชื้อเพลิง",
          "เช่าที่ดิน",
          "เมล็ดพันธุ์ข้าว",
          "อื่นๆ",
        ],
        datasets: [
          {
            label: "Expense Categories",
            data: [
              value[0],
              value[1],
              value[2],
              value[3],
              value[4],
              value[5],
              value[6],
            ],
            backgroundColor: [
              "#7f7fff",
              "#78A3D4",
              "#8B4513",
              "#E22427",
              "#76BC43",
              "#FCCF55",
              "#BEBEBE",
            ],
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
  }, [incomeExpense]);

  if (!incomeExpense) {
    return (
      <div className="text-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4 md:w-1/3 shadow-md">
      <div className="border-b pb-4">สัดส่วนค่าใช้จ่ายในแต่ละหมวดหมู่</div>
      <div className="flex flex-col justify-center w-full max-w-3xl mx-auto">
        <div className="h-64 sm:h-80 lg:h-96">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

Cetegory_Expense.propTypes = {
  incomeExpense: PropTypes.array,
};

export default Cetegory_Expense;
