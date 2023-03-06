import { Button, Heading, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Section } from "../../components";
// import { useAppSelector } from "../../redux/hooks";

const Home = () => {
  // const user = useAppSelector((state) => state.authState.user);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const navigate = useNavigate();

  console.log("user", user);

  return (
    <Section>
      <Heading>This is {user?.email}</Heading>
      <HStack mt={"20"}>
        <Button
          w="full"
          fontSize={"sm"}
          py={"1"}
          fontWeight={600}
          color={"white"}
          bg={"blue.400"}
          onClick={() => navigate("/profile")}
          _hover={{
            bg: "blue.300",
          }}
        >
          Got to Profile
        </Button>
        <Button
          w="full"
          fontSize={"sm"}
          py={"1"}
          fontWeight={600}
          color={"white"}
          bg={"blue.400"}
          onClick={() => navigate("/admin")}
          _hover={{
            bg: "blue.300",
          }}
        >
          Admin
        </Button>
      </HStack>
    </Section>
  );
};

export default Home;
