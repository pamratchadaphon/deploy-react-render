import PropTypes from "prop-types";
import price from "../../images/price.png";
import weight from "../../images/weight.png";
import money from "../../images/money.png";
import sack_rice from "../../images/sack_rice.png";
import Edit_Yield from "./Edit_Yield";

const Yield_rice = ({ riceCaltivation }) => {
  return (
    <div className="w-full lg:w-1/3 flex flex-col rounded-2xl p-6 md:px-10 md:py-16  bg-gradient-to-b from-rose-200 to-pink-200 text-gray-700 shadow-xl border border-pink-300">
      <div className="border-b-2 pb-2 mb-4 md:pb-8 md:mb-8 border-pink-400">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <span className="pb-4 text-xl text-gray-800">
              ผลผลิตจากการเก็บเกี่ยว
            </span>
          </div>
          <Edit_Yield riceCaltivation_id={riceCaltivation.riceCaltivation_id} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={sack_rice} />
        </div>
        <span>
          ปริมาณข้าวที่ได้ :{" "}
          {riceCaltivation.total_yield === undefined
            ? "กำลังโหลด..."
            : riceCaltivation.total_yield > 0
            ? riceCaltivation.total_yield.toLocaleString()
            : riceCaltivation.total_yield}
          กิโลกรัม
        </span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={weight} />
        </div>
        <span>
          ปริมาณข้าวที่ขาย :{" "}
          {riceCaltivation.yield === undefined
            ? "กำลังโหลด..."
            : riceCaltivation.yield > 0
            ? riceCaltivation.yield.toLocaleString()
            : riceCaltivation.yield}{" "}
          กิโลกรัม
        </span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={price} />
        </div>
        <span>
          ราคข้าวต่อกิโลกรัม :{" "}
          {riceCaltivation.rice_price_per_kg === undefined
            ? "กำลังโหลด..."
            : riceCaltivation.rice_price_per_kg}{" "}
          บาท
        </span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={money} />
        </div>
        <span>
          รายรับจากการขายข้าว :{" "}
          {riceCaltivation.yield === undefined &&
          riceCaltivation.rice_price_per_kg === undefined
            ? "กำลังโหลด..."
            : riceCaltivation.yield * riceCaltivation.rice_price_per_kg > 0
            ? (
                riceCaltivation.yield * riceCaltivation.rice_price_per_kg
              ).toLocaleString()
            : riceCaltivation.yield * riceCaltivation.rice_price_per_kg}{" "}
          บาท
        </span>
      </div>
    </div>
  );
};

Yield_rice.propTypes = {
  riceCaltivation: PropTypes.object,
};

export default Yield_rice;
