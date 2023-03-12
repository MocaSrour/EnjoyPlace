import { List, ListIcon, ListItem } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";
import Label from "../form/Label";
import Image from "../form/Image";
import AddLocation from "../AddLocation";
import { toast } from "react-toastify";
import { BiCheckDouble, BiX } from "react-icons/bi";
import "./addPlace.css";

function AddPlace() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [parking, setparking] = useState(false);
  const [ramp, setramp] = useState(false);
  const [elevator, setelevator] = useState(false);
  const [toilet, settoilet] = useState(false);
  const [imageInput, setimageInput] = useState("");
  const navigate = useNavigate();
  const [lat, setLat] = useState(31.93988836744629);
  const [lng, setLng] = useState(35.87612209499119);
  const [selectedFloor, setSelectedFloor] = useState(0);

  const handleFloorChange = (event) => {
    setSelectedFloor(event.target.value);
  };

  const handleLocationChange = (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();

    const place = {
      email,
      title,
      phone,
      parking,
      ramp,
      elevator,
      toilet,
      floor: selectedFloor,
      img: imageInput,
      lat,
      lng,
    };

    await axios
      .post("http://localhost:3117/add-place", place, {
        withCredentials: true,
      })
      .then(() => {
        navigate("/cards");
        toast("Added successfully 👌", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        Object.values(error.response.data.errors).map((err) =>
          toast.error("🤯 " + err, {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
      });
  };

  return (
    <Form id='formAddPlace' onSubmit={handleAddPlace}>
      <div className="info">
        <Label>Title: </Label>
        <Input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
        <Label>Email: </Label>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Label>Phone: </Label>
        <Input
          type="number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></Input>
        <Label>Floor: </Label>
        <select
          id="floor"
          value={selectedFloor}
          onChange={handleFloorChange}
          style={{
            backgroundColor: "#623791",
            color: "white",
            fontSize: "25px",
            borderRadius: "15px",
            padding: "8px",
          }}
        >
          <option value="0">GF</option>
          <option value="1">First</option>
          <option value="2">Second</option>
          <option value="3">Third</option>
          <option value="4">Fourth</option>
        </select>
      </div>
      <List
        className="props"
        spacing={3}
        display="grid"
        gridColumnGap={"15px"}
        fontWeight="bold"
        fontSize="20px"
      >
        <ListItem borderRadius="100px" padding="5px 10px">
          <ListIcon
            as={parking ? BiCheckDouble : BiX}
            color={parking ? "green.400" : "red.400"}
            backgroundColor="rgba(220,220,220,0.5)"
            borderRadius="50%"
            onClick={(e) => {
              setparking(!parking);
            }}
          />
          Parking
        </ListItem>
        <ListItem borderRadius="100px" padding="5px 10px">
          <ListIcon
            as={ramp ? BiCheckDouble : BiX}
            color={ramp ? "green.400" : "red.400"}
            backgroundColor="rgba(220,220,220,0.5)"
            borderRadius="50%"
            onClick={(e) => {
              setramp(!ramp);
            }}
          />
          Ramp
        </ListItem>
        <ListItem borderRadius="100px" padding="5px 10px">
          <ListIcon
            as={elevator ? BiCheckDouble : BiX}
            color={elevator ? "green.400" : "red.400"}
            backgroundColor="rgba(220,220,220,0.5)"
            borderRadius="50%"
            onClick={(e) => {
              setelevator(!elevator);
            }}
          />
          Elevator
        </ListItem>
        <ListItem borderRadius="100px" padding="5px 10px">
          <ListIcon
            as={toilet ? BiCheckDouble : BiX}
            color={toilet ? "green.400" : "red.400"}
            backgroundColor="rgba(220,220,220,0.5)"
            borderRadius="50%"
            onClick={(e) => {
              settoilet(!toilet);
            }}
          />
          Toilet
        </ListItem>
      </List>
      <div className="pimg">
        <Label>Picture of the place: </Label>
        <Image
          src={imageInput}
          alt={imageInput}
          style={{ borderRadius: "50%", height: "200px" }}
        />
        <Input
          value={imageInput}
          onChange={(e) => setimageInput(e.target.value)}
        />

        <AddLocation onLocationChange={handleLocationChange} />
      </div>

      <Button defaultColor="#503791" activeColor="#623791">
        Add Place
      </Button>
    </Form>
  );
}

export default AddPlace;
