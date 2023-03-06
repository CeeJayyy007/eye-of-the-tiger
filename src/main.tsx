import { Routes, Route } from "react-router-dom";
import { RequireUser } from "./components";
import {
  SignUp,
  SignIn,
  LandingPage,
  Home,
  NotFound,
  Profile,
  Admin,
  Unauthorized,
  Layout,
} from "./pages";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route element={<RequireUser allowedRoles={["is_superuser"]} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<RequireUser allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
export default Main;
