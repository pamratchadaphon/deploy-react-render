import PropTypes from "prop-types";
import year from "../../images/year.png";
import rice from "../../images/rice.png";
import area from "../../images/map.png";
import strtDate from "../../images/calendar.png";
import endDate from "../../images/date.png";
import Edit_Info_Ricecrop from "./Edit_Info_Ricecrop";

const Info_ricecrop = ({
  riceCaltivation
}) => {
  const formatDate = (string) => {
    const date = new Date(string);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return (
    <div className="w-full lg:w-1/3 flex flex-col rounded-2xl p-6 md:px-10 md:py-16 bg-gradient-to-b from-violet-200 to-fuchsia-200 text-gray-700 shadow-xl border border-violet-300">
      <div className="border-b-2 pb-2 mb-4 md:pb-8 md:mb-8 border-violet-400">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <span className="pb-4 text-xl text-gray-800">
              รายละเอียดรอบการปลูก
            </span>
          </div>
          <Edit_Info_Ricecrop riceCaltivation_id={riceCaltivation.riceCaltivation_id}/>
        </div>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={year} />
        </div>
        <span>ปี : {riceCaltivation.year === undefined ? "กำลังโหลด..." : riceCaltivation.year}</span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={strtDate} />
        </div>
        <span>วันที่ปลูก : {riceCaltivation.startDate === undefined ? "กำลังโหลด..." : formatDate(riceCaltivation.startDate)}</span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={endDate} />
        </div>
        <span>วันที่เก็บเกี่ยว : {riceCaltivation.endDate === undefined ? "กำลังโหลด..." : formatDate(riceCaltivation.endDate)}</span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={rice} />
        </div>
        <span>พันธุ์ข้าว : {riceCaltivation.riceVariety === undefined ? "กำลังโหลด..." : riceCaltivation.riceVariety}</span>
      </div>
      <div className="flex gap-2">
        <div className=" w-5 h-5 text-center">
          <img src={area} />
        </div>
        <span>พื้นที่ : {riceCaltivation.area === undefined ? "กำลังโหลด..." : riceCaltivation.area} ไร่</span>
      </div>
    </div>
  )
};

Info_ricecrop.propTypes = {
  riceCaltivation: PropTypes.object,
  subdistrict: PropTypes.string,
  district: PropTypes.string,
  province: PropTypes.string,
};

export default Info_ricecrop;
