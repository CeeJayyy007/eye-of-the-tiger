import { Flex } from "@chakra-ui/react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const FormLayout = (props: PageLayoutProps) => {
  const { children } = props;

  return (
    <Flex
      mt="8"
      flexDirection="column"
      alignSelf="center"
      p="10"
      w="40%"
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
    >
      {children}
    </Flex>
  );
};

export default FormLayout;
