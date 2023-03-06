// import { useCookies } from "react-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { userApi } from "../../redux/api/userApi";
import FullScreenLoader from "../feedback/FullScreenLoader";

const RequireUser = ({ allowedRoles }: { allowedRoles: string[] }) => {
  //   const [cookies] = useCookies(["logged_in"]);
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  //   const user = userApi.endpoints.getMe.useQueryState(null, {
  //     selectFromResult: ({ data }) => data as any,
  //   });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = JSON.parse(localStorage.getItem("token") || "{}");

  const loading = isLoading || isFetching;
  console.log("loading", loading, "user", user);

  if (loading) {
    return <FullScreenLoader />;
  }

  return (token || user) && allowedRoles.includes(user?.role as string) ? (
    <Outlet />
  ) : token && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/sign-in" state={{ from: location }} replace />
  );
};

export default RequireUser;
