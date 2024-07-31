import { IoMdPerson } from "react-icons/io";
import { FaSeedling } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from 'axios'

const BoxDashboard = () => {
  const [user, setUser] = useState([]);
  const [riceCaltivation, setRiceCaltivation] = useState([]);
  const [riceVariety, setRiceVariety] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await axios.get(`https://deploy-nodejs-render.onrender.com/user`);
        setUser(resUser.data.filter((data) => data.role === 'user'));
        const resRiceCaltivation = await axios.get(`https://deploy-nodejs-render.onrender.com/riceCaltivation`);
        setRiceCaltivation(resRiceCaltivation.data.filter((data) => data.user_id !== null));
        const resRiceVariety = await axios.get(`https://deploy-nodejs-render.onrender.com/riceVariety`);
        setRiceVariety(resRiceVariety.data)
      } catch (error) {
        console.log('Error : '+error);
      }
    }
    fetchData()
  },[])
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex rounded-lg bg-gray-50 shadow p-4 gap-4 w-full lg:w-1/3">
          <div className="p-5 border rounded-lg bg-sky-300 text-white">
            <IoMdPerson />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">ชาวนา</span>
            <span className="text-xl">{user.length === 0 ? "กำลังโหลด..." : user.length}</span>
          </div>
        </div>
        <div className="flex rounded-lg bg-gray-50 shadow p-4 gap-4 w-full lg:w-1/3">
          <div className="p-5 rounded-lg bg-violet-300 text-white">
            <FaRegFileAlt />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">รอบการปลูก</span>
            <span className="text-xl">{riceCaltivation.length === 0 ? "กำลังโหลด..." : riceCaltivation.length}</span>
          </div>
        </div>

        <div className="flex rounded-lg bg-gray-50 shadow p-4 gap-4 w-full lg:w-1/3">
          <div className="p-5 rounded-lg bg-orange-300 text-white">
            <FaSeedling />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500">พันธุ์ข้าว</span>
            <span className="text-xl">{riceVariety.length === 0 ? "กำลังโหลด..." : riceVariety.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxDashboard;
