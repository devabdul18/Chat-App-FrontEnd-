// Import necessary functions and types from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../shared/apis/api.client";

type LoginUserType = {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
  gender: string;
};
// Define the type for the initial state
export interface AuthState {
  loginData: LoginUserType | null;
  loginError: string | undefined;
  loginLoader: boolean;
  logoutData: null;
  logoutError: string | undefined;
  logoutLoader: boolean;
  signupData: LoginUserType | null;
  signupError: string | undefined;
  signupLoader: boolean;
}

// Define the initial state using the AuthState type
const initialState: AuthState = {
  loginData: null,
  loginError: "" as string,
  loginLoader: false,
  logoutData: null,
  logoutError: undefined,
  logoutLoader: false,
  signupData: null,
  signupError: "" as string,
  signupLoader: false,
};

// Define the async thunk for fetching API data
export const loginFetch: any = createAsyncThunk("loginFetch", async (params: any) => {
  const response = await postData(`auth/login`, params);
  return response;
});

export const logoutFetch: any = createAsyncThunk("logoutFetch", async (params?: any) => {
  const response = await postData(`auth/logout`, params);
  return response;
});

export const signupFetch: any = createAsyncThunk("signupFetch", async (params: any) => {
  const response = await postData(`auth/signup`, params);
  return response;
});

// Create a slice using the AuthState type for state and builder
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(loginFetch.pending, (state) => {
      state.loginLoader = true;
    });

    // Handle fulfilled state
    builder.addCase(loginFetch.fulfilled, (state, action) => {
      state.loginLoader = false;
      state.loginData = action.payload;
    });

    // Handle rejected state
    builder.addCase(loginFetch.rejected, (state, action) => {
      state.loginError = action.error.message;
      state.loginLoader = false;
    });

    builder.addCase(logoutFetch.pending, (state) => {
      state.logoutLoader = true;
    });

    // Handle fulfilled state
    builder.addCase(logoutFetch.fulfilled, (state, action) => {
      state.logoutLoader = false;
      state.logoutData = action.payload;
    });

    // Handle rejected state
    builder.addCase(logoutFetch.rejected, (state, action) => {
      state.logoutError = action.error.message;
      state.logoutLoader = false;
    });

    builder.addCase(signupFetch.pending, (state) => {
      state.signupLoader = true;
    });

    builder.addCase(signupFetch.fulfilled, (state, action) => {
      state.signupLoader = false;
      state.signupData = action.payload;
    });

    builder.addCase(signupFetch.rejected, (state, action) => {
      state.signupError = action.error.message;
      state.signupLoader = false;
    });
  },
});

// Export the reducer

export default loginSlice.reducer;
