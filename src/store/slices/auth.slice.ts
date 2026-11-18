import API from "@/api/axios/axiosInstance";
import { endpoints } from "@/api/endpoints/endPoints";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  clearAuthCookies,
  setAuthCookie,
} from "@/services/helpers/authCookie.helper";
import { getErrorMessage } from "@/services/helpers/global.helper";
import {
  AuthState,
  LoginFormValues,
  RegisterFormValues,
  AuthResponse,
  AuthToken,
} from "@/type/type/auth.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
};

const extractTokenPair = (data: AuthResponse): AuthToken => {
  const { token, access, refresh, access_token, refresh_token, tokens } = data;

  if (typeof token === "string") {
    return { access: token, refresh: refresh ?? refresh_token };
  }

  return {
    access: token?.access ?? access ?? access_token ?? tokens?.access,
    refresh: token?.refresh ?? refresh ?? refresh_token ?? tokens?.refresh,
  };
};

const persistSession = (data: AuthResponse) => {
  if (typeof window === "undefined") return;

  const { access, refresh } = extractTokenPair(data);

  if (access) {
    setAuthCookie(ACCESS_TOKEN_COOKIE, access);
  }

  if (refresh) {
    setAuthCookie(REFRESH_TOKEN_COOKIE, refresh);
  }

  localStorage.removeItem("tokens");

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

const clearSession = () => {
  if (typeof window === "undefined") return;

  clearAuthCookies();
  localStorage.removeItem("tokens");
  localStorage.removeItem("user");
};

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterFormValues,
  { rejectValue: string }
>("auth/register", async (user: RegisterFormValues, { rejectWithValue }) => {
  try {
    const response = await API.post(endpoints.auth.register, user);
    return response.data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginFormValues,
  { rejectValue: string }
>("auth/login", async (credentials: LoginFormValues, { rejectWithValue }) => {
  try {
    const response = await API.post(`${endpoints.auth.login}`, credentials);
    console.log(response)
    const data = (response.data ?? {}) as AuthResponse;
    console.log(data)

    if (data.status === false) {
      return rejectWithValue(data.message || "Login failed. Please try again.");
    }

    const { access } = extractTokenPair(data);

    if (!access) {
      return rejectWithValue(
        data?.message ||
          "Login succeeded but no authentication token was returned by the server.",
      );
    }

    persistSession(data);

    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
      state.success = false;
    },

 
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;

      clearSession();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = true;
      state.user = (action.payload.user as AuthState["user"]) ?? null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload ?? "Login failed. Please try again.";
    });
  },
});

export const { clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
