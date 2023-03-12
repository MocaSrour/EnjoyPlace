import axios from "axios";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Label from "../form/Label";
import Reviews from "../review/Reviews";
import Image from "../form/Image";
import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import PlaceMap from "./PlaceMap";
import { toast } from "react-toastify";
import { BiCheckDouble, BiX, BiLocationPlus } from "react-icons/bi";
import img from "../pics/pinkNature.jpg";
import "./placeDetails.css";
import smile from "../pics/smile.png";
import sad from "../pics/sad.png";

function PlaceDetails() {
  const { placeId } = useParams();
  const [place, setPlace] = useState([]);
  const [address,  setAddress] = useState('');

  const fetchPlace = useCallback(() => {
    axios
      .get(`http://localhost:3117/get-place/${placeId}`, {
        withCredentials: true,
      })
      .then((data) => setPlace(data.data))
      .catch(() =>
        toast.error("Failed getting place details from database", {
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
  }, [placeId]);

  useEffect(() => {
    fetchPlace();
  }, [fetchPlace]);

  let placeDetails;

  if (place) {
    placeDetails = place.place;
  
  }
  let floor;
  switch (placeDetails && placeDetails.placeProperty.floor) {
    case 0:
      floor = "Ground";
      break;
    case 1:
      floor = "First";
      break;
    case 2:
      floor = "Second";
      break;
    case 3:
      floor = "Third";
      break;
    case 4:
      floor = "Fourth";
      break;
    default:
      floor = "Ground";
  }
  let content = (
    <>
      <Image
        src={placeDetails && placeDetails.img ? placeDetails.img : img}
        alt={placeId}
        className="placeImg"
      ></Image>
      <div className="title">
        <Label style={{ textTransform: "uppercase", fontWeight: "bold" }}>
          {placeDetails && placeDetails.title}
        </Label>
        <Label>{floor} Floor</Label>
      </div>
      <div className="placeContact">
        <Label>
          <EmailIcon /> &nbsp; {placeDetails && placeDetails.email}
        </Label>
        <Label style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
          <BiLocationPlus /> &nbsp; {address}</Label>
        <Label>
          <PhoneIcon /> &nbsp; {placeDetails && placeDetails.phone}
        </Label>
      </div>
      <div className="propsNmap">
        <div>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: "20px", height: "23px", paddingTop: "3px" }}
              alt="smile"
              src={smile}
            />
            &nbsp;Exist
          </div>
          <List
            spacing={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            mx="20px"
            mb={2}
            fontWeight="bold"
            fontSize="20px"
          >
            {placeDetails && placeDetails.placeProperty.parking && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.parking
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.parking
                      ? "green.400"
                      : "red.400"
                  }
                />
                Parking
              </ListItem>
            )}
            {placeDetails && placeDetails.placeProperty.ramp && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.ramp
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.ramp
                      ? "green.400"
                      : "red.400"
                  }
                />
                Ramp
              </ListItem>
            )}
            {placeDetails && placeDetails.placeProperty.elevator && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.elevator
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.elevator
                      ? "green.400"
                      : "red.400"
                  }
                />
                Elevator
              </ListItem>
            )}
            {placeDetails && placeDetails.placeProperty.toilet && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.toilet
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.toilet
                      ? "green.400"
                      : "red.400"
                  }
                />
                Toilet
              </ListItem>
            )}
          </List>
        </div>
        <span
          style={{
            minWidth: "0px",
            borderLeft: "2px solid #623791",
            height: "200px",
          }}
        />
        <div>
          <div style={{ display: "flex" }}>
            <img
              style={{ width: "20px", height: "23px", paddingTop: "3px" }}
              alt="sad"
              src={sad}
            />
            &nbsp; Not Exist
          </div>

          <List
            spacing={3}
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            mx="20px"
            mb={2}
            fontWeight="bold"
            fontSize="20px"
          >
            {placeDetails && !placeDetails.placeProperty.parking && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.parking
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.parking
                      ? "green.400"
                      : "red.400"
                  }
                />
                Parking
              </ListItem>
            )}
            {placeDetails && !placeDetails.placeProperty.ramp && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.ramp
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.ramp
                      ? "green.400"
                      : "red.400"
                  }
                />
                Ramp
              </ListItem>
            )}
            {placeDetails && !placeDetails.placeProperty.elevator && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.elevator
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.elevator
                      ? "green.400"
                      : "red.400"
                  }
                />
                Elevator
              </ListItem>
            )}
            {placeDetails && !placeDetails.placeProperty.toilet && (
              <ListItem borderRadius="100px" padding="5px 10px" size="lg">
                <ListIcon
                  as={
                    placeDetails && placeDetails.placeProperty.toilet
                      ? BiCheckDouble
                      : BiX
                  }
                  color={
                    placeDetails && placeDetails.placeProperty.toilet
                      ? "green.400"
                      : "red.400"
                  }
                />
                Toilet
              </ListItem>
            )}
          </List>
        </div>
        <PlaceMap getAddtoParent={(add) => setAddress(add)}/>
      </div>
    </>
  );
 
  return (
    <div className="pageContent">
      {placeDetails && content}

      <Reviews />
    </div>
  );
}

export default PlaceDetails;
