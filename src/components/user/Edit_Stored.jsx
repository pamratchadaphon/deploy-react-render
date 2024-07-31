import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Edit_Stored = ({ riceCaltivation_id }) => {
  const [modal, setModal] = useState(false);
  const [stored, setStored] = useState({});

  const [values, setValues] = useState({
    rice_consumption: "",
    seed_rice: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`
      );
      res.data.length !== 0 ? setStored(res.data) : null;
    };
    fetchData();
  }, [riceCaltivation_id]);

  useEffect(() => {
    setValues({
      ...values,
      rice_consumption: stored.rice_consumption,
      seed_rice: stored.seed_rice,
    });
  }, [stored]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://deploy-nodejs-render.onrender.com/riceCaltivation/${riceCaltivation_id}`,
        values
      );
      Swal.fire({
        title: "แก้ไขสำเร็จ",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.log("Error : " + error);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-500"
        onClick={() => setModal(!modal)}
      >
        <FaRegEdit />
      </button>

      {modal ? (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-black bg-opacity-50 flex">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <motion.div
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="relative bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  แก้ไขข้าวที่เก็บไว้
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center w-8 h-8"
                  onClick={() => setModal(!modal)}
                >
                  <IoMdClose className="w-10 h-10" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="flex flex-col gap-2 mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      เก็บไว้บริโภค (กิโลกรัม)
                    </label>
                    <input
                      type="number"
                      name="rice_consumption"
                      id="rice_consumption"
                      value={values.rice_consumption}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          rice_consumption: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      เก็บไว้ทำเมล็ดพันธุ์ (กิโลกรัม)
                    </label>
                    <input
                      type="number"
                      name="seed_rice"
                      id="seed_rice"
                      value={values.seed_rice}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          seed_rice: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="text-sm bg-green-600 py-3 px-4 rounded-md text-white hover:bg-green-100 hover:text-green-700 hover:duration-200"
                  >
                    บันทึก
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal(!modal)}
                    className="p-3 bg-slate-50 rounded-md text-sm border hover:bg-gray-100"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

Edit_Stored.propTypes = {
  riceCaltivation_id: PropTypes.number,
};

export default Edit_Stored;
