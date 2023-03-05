import { Routes, Route } from "react-router-dom";
import { SignUp, SignIn, LandingPage, Home, NotFound, NavBar } from "./pages";

const Main = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default Main;
