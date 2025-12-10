import axios from "axios";
import { useEffect } from "react";
import useAuthValue from "./useAuthValue";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const useAxiosSecure = () => {
  const { user, logOut } = useAuthValue();
  const nav = useNavigate();
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
/*
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log(error);
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          await logout();
          nav(`/login`, { replace: true });
          Swal.fire({
            title: `${error?.response?.data?.message || error?.message}`,
            icon: "error",
            timer: 1000,
            showConfirmButton: false,
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, nav]);

  return axiosSecure;
};

export default useAxiosSecure;
 */
