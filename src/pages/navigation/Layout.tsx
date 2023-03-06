import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <Flex flexDirection="column" alignContent="center" justifyContent="center">
      <NavBar />
      <Outlet />
    </Flex>
  );
};

export default Layout;
