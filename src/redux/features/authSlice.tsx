import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../api/types";
import { RootState } from "../store";

export interface IAuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuthState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      console.log("state here", action);
    },
    logout: () => initialState,
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.authState.user;
export const selectCurrentToken = (state: RootState) => state.authState.token;
