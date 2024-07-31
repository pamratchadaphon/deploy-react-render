import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserAuthen = ({ children }) => {
  const navigate = useNavigate();
  const [authen, setAuthen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const authenResponse = await axios.post(
          `https://server-ut-ratchadaphon.vercel.app/user/authen`,
          null,
          config
        );
        if (authenResponse.data.status === 'ok') {
          setAuthen(true)
        }else{
          setAuthen(false)
          alert("Authentication failed")
          navigate("/")
        }
      } catch (error) {
        console.log("Error" + error);
        setAuthen(false);
        navigate("/");
      }
    };
    fetchData();
  });
  return (
    <div>
      {authen ? children : null}
    </div>
  );
};

UserAuthen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserAuthen;
