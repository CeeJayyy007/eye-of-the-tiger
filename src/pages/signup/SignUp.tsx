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
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
import { FormLayout, useToast } from "../../components";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignUpUserMutation } from "../../redux/api/authApi";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  zipCode: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .max(50, "First name must not exceed 50 characters"),
    lastName: yup.string().max(50, "Last name must not exceed 50 characters"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    zipCode: yup
      .string()
      .required("Zip/Postal code is required")
      .min(6, "Zip/Postal code must be at least 6 characters")
      .max(6, "Zip/Postal code must not exceed 6 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Confirm Password does not match"),
  })
  .required();

const SignUp = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => setShow(!show);
  const handleClickConfirm = () => setShowConfirm(!showConfirm);

  const [signUpUser, { isLoading, isSuccess, error, isError }] =
    useSignUpUserMutation();

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
      console.log("error", error);

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

  const onSubmit = (values: SignUpFormData) => {
    signUpUser(values);
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
          Sign Up
        </Heading>
        <FormControl isInvalid={errors.firstName ? true : false}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            id="firstName"
            placeholder="First Name"
            {...register("firstName")}
          />
          <FormErrorMessage>
            {errors.firstName && errors.firstName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.lastName ? true : false}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            id="lastName"
            placeholder="Last Name"
            {...register("lastName")}
          />
          <FormErrorMessage>
            {errors.lastName && errors.lastName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.zipCode)}>
          <FormLabel htmlFor="fzipCode">Zip/Postal Code</FormLabel>
          <Input
            id="zipCode"
            placeholder="Zip/Postal Code"
            {...register("zipCode")}
          />
          <FormErrorMessage>
            {errors.zipCode && errors.zipCode.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password ? true : false}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              id="password"
              placeholder="password"
              type={show ? "text" : "password"}
              {...register("password", {
                required: "This is required",
                minLength: { value: 6, message: "Minimum length should be 6" },
              })}
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
        <FormControl isInvalid={errors.confirmPassword ? true : false}>
          <FormLabel htmlFor="password">Confirm Password</FormLabel>
          <InputGroup>
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "This is required",
                minLength: { value: 6, message: "Minimum length should be 6" },
              })}
            />
            <InputRightElement pr="4">
              <Button
                rounded="full"
                h="1.75rem"
                variant="ghost"
                onClick={handleClickConfirm}
              >
                {showConfirm ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>
        <HStack gap={4} w="100%">
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
            loadingText="Signing up"
            w="100%"
            borderRadius="full"
            type="submit"
          >
            Sign In
          </Button>
        </HStack>
      </VStack>
      <hr />
      <HStack alignContent="baseline" justifyContent="center" mt="4">
        <Text fontSize="md" fontWeight="medium">
          Already have an an Account?
        </Text>
        <Button
          colorScheme="blue"
          variant="link"
          pb="0.5"
          onClick={() => navigate("/sign-in")}
        >
          Sign In now
        </Button>
      </HStack>
    </FormLayout>
  );
};

export default SignUp;
