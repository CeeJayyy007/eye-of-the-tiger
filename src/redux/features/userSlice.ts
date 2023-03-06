import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../api/types";

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      // state.user = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.email,
          first_name: action.payload.firstName,
          last_name: action.payload.lastName,
        })
      );
      // state.user.email = action.payload.email;
      // state.user.token = action.payload.token;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
