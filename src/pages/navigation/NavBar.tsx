import {
  Box,
  Flex,
  Text,
  Heading,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../redux/api/authApi";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useToast } from "../../components";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Services",
    children: [
      {
        label: "Walker",
        subLabel: "Register as walker",
        href: "#",
      },
    ],
  },
];

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const user = useAppSelector((state) => state.userState.user);
  const toast = useToast();

  const navigate = useNavigate();
  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  console.log("user nav", user);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Log out successful!",
        status: "success",
      });

      navigate("/");
    }

    if (isError) {
      if (Array.isArray((error as any).data.detail)) {
        (error as any).data.detail.forEach((el: any) =>
          toast({
            title: `${el.msg}`,
            status: "error",
          })
        );
      } else {
        toast({
          title: `${(error as any).data.detail}`,
          status: "error",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleLogout = async () => {
    logoutUser();
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        pt={{ base: 4 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          pb={{ base: 4 }}
          alignItems={{ base: "center", md: "center" }}
          justifyContent={{ base: "space-between", md: "space-between" }}
        >
          <Flex gap={"10"} alignItems={"center"}>
            <Heading
              as="button"
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              size="lg"
              fontWeight={"extrabold"}
              color={useColorModeValue("gray.800", "white")}
              onClick={() => navigate("/")}
            >
              Logo
            </Heading>
            <DesktopNav />
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              py={"1"}
              fontWeight={600}
              color={"white"}
              bg={"blue.400"}
              onClick={() => navigate("/sign-up")}
              _hover={{
                bg: "blue.300",
              }}
            >
              Sign Up
            </Button>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              py={"1"}
              fontWeight={600}
              color={"white"}
              bg={"gray.400"}
              onClick={() => handleLogout()}
              _hover={{
                bg: "blue.300",
              }}
            >
              Log Out
            </Button>
          </Stack>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default NavBar;
