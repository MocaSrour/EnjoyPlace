import {
  Badge,
  Box,
  Image,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiCheckDouble, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import AlertDialogDelete from "../AlertDialogDelete";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import img from '../pics/pinkNature.jpg';

function Card({ place, handleDeletePlace }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRole = user.role;

  const property = {
    imageUrl: place.img? place.img : img,
    imageAlt:  place.title,
    floor: place.placeProperty.floor,
    parking: place.placeProperty.parking,
    ramp: place.placeProperty.ramp,
    elevator: place.placeProperty.elevator,
    toilet: place.placeProperty.toilet,
    title: place.title,
    rating: place.rate,
  };

  const handleGoToPlaceDetails = () => {
    navigate(`/PlaceDetails/${place.id}`);
  };
  let flr;
  switch (property.floor) {
    case 0:
      flr = "Ground";
      break;
    case 1:
      flr = "First";
      break;
    case 2:
      flr = "Second";
      break;
    case 3:
      flr = "Third";
      break;
    case 4:
      flr = "Fourth";
      break;
    default:
      flr = "Ground";
  }
  return (
    <Box maxW="sm" overflow="hidden" >
      <Image
        objectFit="cover"
        w="100%"
        h="30%" 
        onClick={handleGoToPlaceDetails}
        src={property.imageUrl}
        alt={property.imageAlt}
      />

      <Box my={2}>
        <Box display="flex" alignItems="baseline">
          { (userRole && userRole === 'Admin') &&
            <Badge borderRadius="full" px="2" color='red' colorScheme='purple'>
          <>
      <AlertDialogDelete
        onConfirm={() => handleDeletePlace(place.id)}
        title="Delete"
        message={`Are you sure you want to delete "${place.title}"?`}
      />
      
    </>
          </Badge>}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
           &bull; {flr}  floor
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="bold"
          fontSize={"md"}
          textTransform="uppercase"
          textAlign="center"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          bg={useColorModeValue("gray.50", "gray.900")}
          p={2}
          borderBottom={"3px solid #CBC3E3"}
          borderRadius={"20px 20px 0 0"}
        >
          {property.title}
        </Box>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={5} pt={5} pb={2} borderRadius={"0 0 20px 20px"}>
          <List spacing={3}>
            <ListItem>
              <ListIcon
                as={property.parking ? BiCheckDouble : BiX}
                color={property.parking ? "green.400" : "red.400"}
              />
              Parking
            </ListItem>
            <ListItem>
              <ListIcon
                as={property.ramp ? BiCheckDouble : BiX}
                color={property.ramp ? "green.400" : "red.400"}
              />
              Ramp
            </ListItem>
            <ListItem>
              <ListIcon
                as={property.elevator ? BiCheckDouble : BiX}
                color={property.elevator ? "green.400" : "red.400"}
              />
              Elevator
            </ListItem>
            <ListItem>
              <ListIcon
                as={property.toilet ? BiCheckDouble : BiX}
                color={property.toilet ? "green.400" : "red.400"}
              />
              Toilet
            </ListItem>
          </List>
          <Box display="flex" mt="2" alignItems="center">
           Rate:
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            <ReactStars edit={false} value={property.rating} />
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
