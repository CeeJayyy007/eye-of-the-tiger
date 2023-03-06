import { Heading } from "@chakra-ui/react";
import { Section } from "../../components";
import { useAppSelector } from "../../redux/hooks";

const Profile = () => {
  const user = useAppSelector((state) => state?.userState?.user);

  console.log(user);

  return (
    <Section>
      <Heading>This is {user?.email}'s profile page</Heading>
    </Section>
  );
};

export default Profile;
