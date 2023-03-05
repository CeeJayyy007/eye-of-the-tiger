import { BoxProps, Container } from "@chakra-ui/react";

interface PageLayoutProps extends BoxProps {
  children: React.ReactNode;
}

const Section = (props: PageLayoutProps) => {
  const { children } = props;

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignSelf="center"
      justifyContent="center"
    >
      {children}
    </Container>
  );
};

export default Section;
