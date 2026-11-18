import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { endpoints } from "@/api/endpoints/endPoints";
import {
  ACCESS_TOKEN_COOKIE,
  AUTH_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  clearAuthCookies,
  getCookie,
  setAuthCookie,
} from "@/services/helpers/authCookie.helper";

const axiosInstance = axios.create({
  baseURL:"http://localhost:8000"
})

type RetriableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<string | null> | null = null;

const isAuthEndpoint = (url?: string): boolean =>
  typeof url === "string" && url.includes("/textsense/auth/");

const refreshAccessToken = async (): Promise<string | null> => {
  const refresh = getCookie(REFRESH_TOKEN_COOKIE);

  if (!refresh) return null;

  try {
    const response = await axios.post<{ access_token?: string }>(
      endpoints.auth.refresh,
      { refresh },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      },
    );

    const access = response.data?.access_token;

    if (!access) return null;

    setAuthCookie(ACCESS_TOKEN_COOKIE, access, AUTH_COOKIE_MAX_AGE);
    return access;
  } catch {
    return null;
  }
};

const handleSessionExpired = () => {
  clearAuthCookies();

  try {
    localStorage.removeItem("user");
  } catch {
    
  }

  window.location.href = "/login";
};

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie("accessToken");

  if (typeof token === "string" && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Let Axios generate the multipart boundary.
  if (config.data instanceof FormData) {
    config.headers.delete("Content-Type");
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;

    // Network error, timeout, or no request config: nothing to retry.
    if (!error.response || !originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const shouldTryRefresh =
      isUnauthorized &&
      !originalRequest._retry &&
      !isAuthEndpoint(originalRequest.url);

    // Not a 401, already retried once, or a login/register/etc. call.
    if (!shouldTryRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // Share one refresh call between all requests that fail at the same time.
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newAccessToken = await refreshPromise;

    if (!newAccessToken) {
      handleSessionExpired();
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return axiosInstance(originalRequest);
  },
);


export default axiosInstance;

