import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // important for refresh token cookie
});

// Attach Access Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto Refresh Token
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // 🛑 Do NOT retry refresh endpoint itself
    if (original.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");

        localStorage.setItem("accessToken", data.data.accessToken);

        original.headers.Authorization =
          "Bearer " + data.data.accessToken;

        return api(original);
      } catch (err) {
        // logout user
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
