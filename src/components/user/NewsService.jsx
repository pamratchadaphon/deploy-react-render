import { FaDroplet } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";
import { FaBahtSign } from "react-icons/fa6";
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsService = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://deploy-nodejs-render.onrender.com/newsService");
        setData(res.data);
      } catch (error) {
        console.log("Error : " + error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl w-full">
        {data.length > 0 ? (
          <div className="hidden md:flex flex-col justify-center items-center sm:flex-row gap-6 p-4">
            {data.map((data, index) => {
              if (data.name === "ราคาข้าว") {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-50 shadow  hover:bg-yellow-600 hover:text-white rounded-lg w-full duration-500"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-yellow-700 bg-yellow-100 animate-bounce">
                      <FaBahtSign />
                    </div>
                    <span className="text-sm">{data.name}</span>
                  </a>
                );
              } else if (data.name === "สถานการณ์น้ำ") {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-50 shadow hover:bg-sky-600 hover:text-white rounded-lg w-full duration-500"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-sky-700 bg-sky-100 animate-bounce">
                      <FaDroplet />
                    </div>
                    <span className="text-sm">{data.name}</span>
                  </a>
                );
              } else if (data.name === "ข่าวราคาข้าว") {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-50 shadow hover:bg-green-600 hover:text-white rounded-lg w-full duration-500"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-green-700 bg-green-100 animate-bounce">
                      <FaNewspaper />
                    </div>
                    <span className="text-sm">{data.name}</span>
                  </a>
                );
              } else {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center gap-2 py-2 px-4 bg-gray-50 shadow hover:bg-gray-600 hover:text-white rounded-lg w-full duration-500"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-gray-700 bg-gray-100 animate-bounce">
                      <LiaTemperatureLowSolid />
                    </div>
                    <span className="text-sm">{data.name}</span>
                  </a>
                );
              }
            })}
          </div>
        ) : null}

        {data.length > 0 ? (
          <div className="md:hidden flex justify-center gap-2 bg-white p-2 overflow-x-scroll">
            {data.map((data, index) => {
              if (data.name === "ราคาข้าว") {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center p-2 bg-gray-50 shadow rounded-lg w-full"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-yellow-700 bg-yellow-100 animate-bounce">
                      <FaBahtSign />
                    </div>
                    <span className="text-xs">{data.name}</span>
                  </a>
                );
              } else if (data.name === "สถานการณ์น้ำ") {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center p-2 bg-gray-50 shadow rounded-lg w-full"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-sky-700 bg-sky-100 animate-bounce">
                      <FaDroplet />
                    </div>
                    <span className="text-xs">{data.name}</span>
                  </a>
                );
              } else if (data.name === "ข่าวราคาข้าว") {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center p-2 bg-gray-50 shadow rounded-lg w-full"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-green-700 bg-green-100 animate-bounce">
                      <FaNewspaper />
                    </div>
                    <span className="text-xs">{data.name}</span>
                  </a>
                );
              } else {
                return (
                  <a
                    href={`${data.content}`}
                    target="_blank"
                    className="flex flex-col md:flex-row items-center justify-center p-2 bg-gray-50 shadow rounded-lg w-full"
                    key={index}
                  >
                    <div className="rounded-full p-4 text-gray-700 bg-gray-100 animate-bounce">
                      <LiaTemperatureLowSolid />
                    </div>
                    <span className="text-xs">{data.name}</span>
                  </a>
                );
              }
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewsService;
