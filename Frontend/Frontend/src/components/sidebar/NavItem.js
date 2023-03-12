import { Flex, Icon, Menu, MenuButton, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function NavItem({ navsize, path, title, icon, active, description }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navsize === "small" ? "center" : "stretch"}
    >
      <Menu placement="right">
        <NavLink to={"/" + path}>
          <Stack
            backgroundColor={active && "#CBC3E3"}
            p={3}
            borderRadius={8}
            _hover={{
              textDecor: "none",
              backgroundColor: "#CBC3E3",
              w: "100%",
            }}
            w={navsize === "large" && "100%"}
          >
            <MenuButton w="100%">
              <Flex>
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? "white" : "gray.500"}
                />
                <Text
                  fontSize="20"
                  fontWeight="bold"
                  color="black"
                  ml={5}
                  display={navsize === "small" ? "none" : "flex"}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Stack>
        </NavLink>
      </Menu>
    </Flex>
  );
}

export default NavItem;
