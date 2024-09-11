import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../../shared/apis/api.client";

type AuthUserType = {
  id: string;
  fullName: string;
  email: string;
  profilePic: string;
  gender: string;
};

export interface AuthInterface {
  AuthLoading: boolean;
  AuthData: AuthUserType | null;
  AuthError: string | undefined;
}

const initialState: AuthInterface = {
  AuthLoading: false,
  AuthData: null,
  AuthError: "" as string,
};

export const fetchData: any = createAsyncThunk("fetchData", async () => {
  const response = await getData(`auth`);
  return response.data;
});

export const fetchProfile: any = createAsyncThunk("fetchProfile", async () => {
  const response = await getData(`auth/profile`);
  return response;
});

const profileSlice = createSlice({
  name: "profile",

  initialState: initialState,
  reducers: {
    resetProfile: (state) => {
      // Reset state to initial values
      state.AuthLoading = false;
      state.AuthData = null;
      state.AuthError = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.AuthLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.AuthLoading = false;
      state.AuthData = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.AuthLoading = false;
      state.AuthError = action.error.message;
    });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
