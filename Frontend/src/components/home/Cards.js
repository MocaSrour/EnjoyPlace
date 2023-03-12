import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import { toast } from "react-toastify";
import Input from "../form/Input";
import Label from "../form/Label";
import "./cards.css";

function Cards() {
  const [places, setplaces] = useState([]);
  const [searachTerm, setSearchTerm] = useState("");

  const fetchPlaces = async () => {
    const res = await axios.get("http://localhost:3117/places", {
      withCredentials: true,
    });
    setplaces(res.data);
  };

  useEffect(() => {
    fetchPlaces().catch(() =>
      toast.error("Error getting places", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    );
  }, [searachTerm]);

  const handleDeletePlace = async (id) => {
    await axios
      .delete(`http://localhost:3117/delete-place/${id}`, {
        withCredentials: true,
      })
      .then(() => fetchPlaces())
      .catch(() =>
        toast.error("Error deleting place", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };
  const renderedplaces =
    places.places &&
    // eslint-disable-next-line
    places.places.map((place, index) => {
      if (searachTerm) {
        if (searachTerm && place.title.includes(searachTerm))
          return (
            <Card
              key={index}
              place={place}
              handleDeletePlace={handleDeletePlace}
            />
          );
      } else
        return (
          <Card
            key={index}
            place={place}
            handleDeletePlace={handleDeletePlace}
          />
        );
    });

  return (
    <>
      <Label>Search:</Label>
      <Input
        style={{ margin: "10px" }}
        value={searachTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></Input>

      <div className="cards">
        {places.places ? (
          renderedplaces
        ) : (
          <div>
            {" "}
            {toast("🦄 Loading...!", {
              position: "top-center",
              autoClose: 500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })}{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
