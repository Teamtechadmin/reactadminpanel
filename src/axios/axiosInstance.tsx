import axios from "axios";

// Set config defaults when creating the instance
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Change request data/error here
axiosInstance.interceptors.request.use(
  (config: any) => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("accessToken");
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ? token : ""}`,
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => {
    console.log(error, "the error");

    return Promise.reject(error);
  },
);

const kickout = () => {
  localStorage.clear();

  if (
    window.location.pathname !== "/" &&
    window.location.pathname !== "/login/"
  ) {
    window.location.href = "/login/";
  }
};

axiosInstance.interceptors.response.use(undefined, async (error) => {
  const originalReq = error.config;
  if (error?.response?.status === 401) {
    try {
      const refreshUrl = baseURL + "auth/refreshToken";
      axios.get(refreshUrl).then(() => {
        axios.request({ ...originalReq, headers: {} });
      });
    } catch (error) {
      kickout();
    }
  }

  return Promise.reject(error);
});
