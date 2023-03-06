import { ChakraProvider, theme } from "@chakra-ui/react";
// import { PageLayout } from "./components";
import Main from "./main";

export const App = () => (
  <ChakraProvider theme={theme}>
    {/* <PageLayout> */}
    <Main />
    {/* </PageLayout> */}
  </ChakraProvider>
);
