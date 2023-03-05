import { ToastProps, useToast as useChakraToast } from "@chakra-ui/react";

const useToast = () => {
  const customToast = useChakraToast();

  const toast = (props: ToastProps) => {
    const { title, status } = props;

    customToast({
      title: title,
      status: status,
      variant: "left-accent",
      position: "top-right",
      isClosable: true,
    });
  };

  return toast;
};

export default useToast;
