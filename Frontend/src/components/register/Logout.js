import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

function LogOut() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:3117/logout", {
        withCredentials: true,
      })
      .then(() => {
        logout();
        navigate("/");
      }).catch((err) => toast.error("Failed to Logout, something went wrong",{
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }))
  }, [logout, navigate]);

  return;
}

export default LogOut;
