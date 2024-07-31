import PropTypes from "prop-types";
import rice_consumption from "../../images/rice_consumption.png";
import seed_rice from "../../images/seed_rice.png";
import Edit_Stored from "./Edit_Stored";

const Stored_Rice = ({ riceCaltivation }) => {
  return (
    <div className="w-full lg:w-1/3 flex flex-col rounded-2xl p-6 md:px-10 md:py-16 bg-gradient-to-b from-blue-200 to-sky-200 text-gray-700 shadow-xl border border-blue-300">
      <div className="border-b-2 pb-2 mb-4 md:pb-8 md:mb-8 border-blue-400">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <span className="pb-4 text-xl text-gray-800">ข้าวที่เก็บไว้</span>
          </div>
          <Edit_Stored riceCaltivation_id={riceCaltivation.riceCaltivation_id}/>
        </div>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={rice_consumption} />
        </div>
        <span>
          ข้าวที่เก็บไว้บริโภค : {riceCaltivation.rice_consumption === undefined ? "กำลังโหลด..." : riceCaltivation.rice_consumption} กิโลกรัม
        </span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={seed_rice} />
        </div>
        <span>
          ข้าวที่เก็บไว้ทำเมล็ดพันธุ์ : {riceCaltivation.seed_rice === undefined ? "กำลังโหลด..." : riceCaltivation.seed_rice} กิโลกรัม
        </span>
      </div>
    </div>
  );
};

Stored_Rice.propTypes = {
  riceCaltivation: PropTypes.object,
};

export default Stored_Rice;
