import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Text,
  HStack,
  InputRightElement,
  InputGroup,
  Heading,
} from "@chakra-ui/react";
import { FormLayout, useToast } from "../../components";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useSignInUserMutation } from "../../redux/api/authApi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = yup
  .object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  })
  .required();

const SignIn = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const [signInUser, { isLoading, isSuccess, error, isError }] =
    useSignInUserMutation();

  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "User registered successfully",
        status: "success",
      });

      navigate("/home");
      reset();
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

  const onSubmit = async (values: SignInFormData) => {
    signInUser(values);
  };

  return (
    <FormLayout>
      <VStack
        as="form"
        gap={2}
        onSubmit={handleSubmit(onSubmit)}
        w="100%"
        mb="8"
      >
        <Heading as="h4" size="lg" fontWeight="extrabold" mb="4">
          Sign In
        </Heading>
        <FormControl isInvalid={errors.email ? true : false}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" placeholder="Email" {...register("email")} />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password ? true : false} mt="4">
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="password"
              {...register("password")}
            />
            <InputRightElement pr="4">
              <Button
                rounded="full"
                h="1.75rem"
                variant="ghost"
                onClick={handleClick}
              >
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <HStack mt="8" gap={4} w="100%">
          <Button
            variant="outline"
            w="100%"
            borderRadius="full"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isSubmitting}
            loadingText="Signing in"
            type="submit"
            w="100%"
            borderRadius="full"
          >
            Sign In
          </Button>
        </HStack>
      </VStack>
      <hr />
      <HStack alignContent="baseline" justifyContent="center" mt="4">
        <Text fontSize="md" fontWeight="medium">
          Don't have an Account?
        </Text>
        <Button
          colorScheme="blue"
          variant="link"
          pb="0.5"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up now
        </Button>
      </HStack>
    </FormLayout>
  );
};

export default SignIn;
