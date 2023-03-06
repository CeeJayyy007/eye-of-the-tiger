import React from "react";
// import { useCookies } from "react-cookie";
import FullScreenLoader from "../feedback/FullScreenLoader";
import { userApi } from "../../redux/api/userApi";

type AuthMiddlewareProps = {
  children: React.ReactElement;
};

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  //   const [cookies] = useCookies(["logged_in"]);
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: !!token,
  });

  const loading = isLoading || isFetching;

  if (loading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
