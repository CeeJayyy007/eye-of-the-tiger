import { Button } from "@chakra-ui/react";
import { Section } from "../../components";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const pageLinks = [
    {
      title: "Sign In",
      link: "/sign-in",
    },
    {
      title: "Sign Up",
      link: "/sign-up",
    },
    {
      title: "Admin Dashboard",
      link: "/admin",
    },
    {
      title: "Home Page",
      link: "/home",
    },
  ];

  return (
    <Section>
      {pageLinks.map((page) => (
        <Button
          key={page.link}
          pt="4"
          variant="link"
          colorScheme="black"
          onClick={() => navigate(page.link)}
        >
          {page.title}
        </Button>
      ))}
    </Section>
  );
};

export default LandingPage;
