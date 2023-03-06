import { Box, Spinner, Container } from "@chakra-ui/react";

const FullScreenLoader = () => {
  return (
    <Container sx={{ height: "95vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Spinner />
      </Box>
    </Container>
  );
};

export default FullScreenLoader;
