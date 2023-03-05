import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInFormData } from "../../pages/signin/SignIn";
import { SignUpFormData } from "../../pages/signup/SignUp";
import { transformSignInData, transformSignUpData } from "../../utils/helper";
import { IGenericResponse } from "./types";
import { userApi } from "./userApi";

let formData = new FormData();

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<IGenericResponse, SignUpFormData>({
      query(data) {
        formData = transformSignUpData(data);

        return {
          url: "signup",
          method: "POST",
          body: formData,
        };
      },
    }),
    signInUser: builder.mutation<
      { access_token: string; status: string },
      SignInFormData
    >({
      query(data) {
        formData = transformSignInData(data);

        return {
          url: "token",
          method: "POST",
          body: formData,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
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
          credentials: "include",
        };
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
