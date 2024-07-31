import { useEffect, useState } from "react";
import AddNewService from "../../components/admin/AddNewService";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import Table_NewsService from "../../components/admin/Table_NewsService";
import axios from "axios";

const ManageNewsService = () => {
  const [data, setData] = useState([]);

  const [showSidebar_Moble, setShowSideBar_Moble] = useState(false);
  const [showSidebar_Web, setShowSideBar_Web] = useState(true);

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
    <div>
      {showSidebar_Web ? (
        <div className="mx-auto flex">
          {showSidebar_Moble ? (
            <div className="block lg:basis-1/6">
              <Sidebar
                page={"newsService"}
                showSidebar_Moble={showSidebar_Moble}
                setShowSideBar_Moble={setShowSideBar_Moble}
              />
            </div>
          ) : (
            <div className="hidden lg:block basis-1/6">
              <Sidebar page={"newsService"} />
            </div>
          )}
          <div className="w-full lg:basis-5/6">
            <Navbar
              setShowSideBar_Moble={setShowSideBar_Moble}
              setShowSideBar_Web={setShowSideBar_Web}
              showSidebar_Web={showSidebar_Web}
              showSidebar_Moble={showSidebar_Moble}
            />
            <div className="bg-white m-4 rounded-lg shadow space-y-4 p-4 basis-5/6">
              {data.length < 4 ? <AddNewService /> : null}
              <Table_NewsService data={data} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {showSidebar_Moble ? (
            <div className="block lg:hidden">
              <Sidebar
                page={"newsService"}
                showSidebar_Moble={showSidebar_Moble}
                setShowSideBar_Moble={setShowSideBar_Moble}
              />
            </div>
          ) : (
            <div className="hidden">
              <Sidebar page={"newsService"} />
            </div>
          )}
          <div className="w-full lg:basis-6/6">
            <Navbar
              setShowSideBar_Moble={setShowSideBar_Moble}
              setShowSideBar_Web={setShowSideBar_Web}
              showSidebar_Web={showSidebar_Web}
              showSidebar_Moble={showSidebar_Moble}
            />
            <div className="bg-white m-4 rounded-lg shadow space-y-4 p-4 basis-5/6">
              {data.length < 4 ? <AddNewService /> : null}
              <Table_NewsService data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNewsService;
