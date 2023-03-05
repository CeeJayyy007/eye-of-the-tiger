import { Flex } from "@chakra-ui/react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;

  return (
    <Flex flexDirection="column" py="4" px="6" minH="100vh">
      {children}
    </Flex>
  );
};

export default PageLayout;
