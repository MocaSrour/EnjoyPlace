import Sidebar from "./components/sidebar/Sidebar";
import Login from "./components/register/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Cards from "./components/home/Cards";
import PlaceDetails from "./components/place/PlaceDetails";
import AddPlace from "./components/place/AddPlace";
import LogOut from "./components/register/Logout";
import Home from "./components/home/Home";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import EditReview from "./components/review/EditReview";
import './app.css';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="sidebar" >
      <Sidebar />
      </div>
      <div className="content">
      <Routes>
        {!user && <Route path="/login" element={<Login />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {user && <Route path="/cards" element={<Cards />} />}
        {user && (
          <Route path="/PlaceDetails/:placeId" element={<PlaceDetails />} />
        )}
        {user && user.role === "Admin" && (
          <Route path="/AddPlace" element={<AddPlace />} />
        )}
        {user && <Route path="/LogOut" element={<LogOut />} />}
        {user && <Route path="/edit" element={<EditReview />} />}
        <Route path="/" element={<Home />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
