import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInFormData } from "../../pages/signin/SignIn";
import { SignUpFormData } from "../../pages/signup/SignUp";
import { transformSignInData, transformSignUpData } from "../../utils/helper";
import { RootState } from "../store";
import { IGenericResponse } from "./types";
import { IAuthState, setCredentials, logout } from "../features/authSlice";
// import { userApi } from "./userApi";

let formData = new FormData();

const baseQuery = fetchBaseQuery({
  baseUrl: `/api/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authState.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signUpUser: builder.mutation<IAuthState, SignUpFormData>({
      query(data) {
        formData = transformSignUpData(data);

        return {
          url: "signup",
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const userData = await queryFulfilled;
          dispatch(setCredentials({ ...userData.data }));
          // await dispatch(userApi.endpoints.getMe.initiate(null));

          localStorage.setItem("token", JSON.stringify(userData?.data?.token));
          localStorage.setItem("user", JSON.stringify(userData?.data?.user));
        } catch (error) {}
      },
    }),
    signInUser: builder.mutation<IAuthState, SignInFormData>({
      query(data) {
        formData = transformSignInData(data);

        return {
          url: "token",
          method: "POST",
          body: formData,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const userData = await queryFulfilled;
          dispatch(setCredentials({ ...userData.data }));
          // await dispatch(userApi.endpoints.getMe.initiate(null));

          localStorage.setItem("token", JSON.stringify(userData?.data?.token));
          localStorage.setItem("user", JSON.stringify(userData?.data?.user));
        } catch (error) {}
      },
    }),
    verifyEmail: builder.mutation<
      IGenericResponse,
      { verificationCode: string }
    >({
      query({ verificationCode }) {
        return {
          url: `verifyemail/${verificationCode}`,
          method: "GET",
        };
      },
    }),
    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          localStorage.clear();
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
} = authApi;
