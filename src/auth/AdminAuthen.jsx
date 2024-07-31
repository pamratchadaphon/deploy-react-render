import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AdminAuthen = ({ children }) => {
  const navigate = useNavigate()
  const [authen, setAuthen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate('/')
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const auth = await axios.post("https://server-ut-ratchadaphon.vercel.app/user/authen", null, config);
        if (auth.data.status === 'ok') {
          setAuthen(true)
        }
      } catch (error) {
        console.log("Error" + error);
      }
    }
    fetchData()
  }, [navigate])

  return (
    <div>
      {authen ? children : null}
    </div>
  )
}

AdminAuthen.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminAuthen
