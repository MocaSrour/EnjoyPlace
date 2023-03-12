import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GoHome, GoPlus } from "react-icons/go";
import { GrLogin, GrLogout, GrMenu } from "react-icons/gr";
import NavItem from "./NavItem";
import userPic from "../pics/user.jpg";
import AuthContext from "../../context/AuthContext";
import Logo from "../pics/logo-no-background.png";

function Sidebar() {
  const { user } = useContext(AuthContext);
  const [navsize, setnavsize] = useState("large");


  return (
    <Flex
      pos="fixed"
      pb={3}
      left="5"
      h="fit-content"
      marginTop="2.5vh"
      boxShadow="0 0px 30px 0 rgba(0,0,0)"
      borderRadius={navsize === "small" ? "15px" : "30px"}
      w={navsize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Image
        mt={2}
        ml={5}
        mb={2}
        style={{ paddingTop: "2", aspectRatio: "1" }}
        w={navsize === "small" ? "50px" : "150px"}
        src={Logo}
      />
       <Divider display={navsize === "small" ? "none" : "flex"} />
      <Flex
        p="5%"
        h="fit-content"
        flexDir="column"
        alignItems={navsize === "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Button
          background="none"
          _hover={{ background: "#CBC3E3" }}
          navsize={navsize}
          onClick={() => {
            if (navsize === "small") setnavsize("large");
            else setnavsize("small");
          }}
        >
          <GrMenu />
        </Button>

        {user && (
          <NavItem
            mt={0}
            navsize={navsize}
            icon={GoHome}
            title="Places"
            path="Cards"
            description="Discover places you can visit."
          />
        )}
        {!user && (
          <NavItem
            navsize={navsize}
            icon={GrLogin}
            title="Log in"
            path="Login"
            description="Join and check your favourite places."
          />
        )}
        {!user && (
          <NavItem
            navsize={navsize}
            icon={GrLogin}
            title="Register"
            path="Register"
            description="Create a new account so you can enjoy places."
          />
        )}
        {user && user.role === "Admin" && (
          <NavItem
            mt={0}
            navsize={navsize}
            icon={GoPlus}
            title="Add Place"
            path="AddPlace"
            description="Add a new place to the list."
          />
        )}
        {user && (
          <NavItem
            navsize={navsize}
            icon={GrLogout}
            title="Log out"
            path="LogOut"
            description="Bye bye, please visit us again."
          />
        )}
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navsize === "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navsize === "small" ? "none" : "flex"} />

        {user && (
          <Flex mt={4} align="center">
            <Avatar size="sm" src={userPic} />
            <Flex
              flexDir="column"
              ml={4}
              display={navsize === "small" ? "none" : "flex"}
            >
              <Heading as="h3" size="sm">
                Hello cute,
              </Heading>
              <Text color="gray">{user.userName}</Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Sidebar;
